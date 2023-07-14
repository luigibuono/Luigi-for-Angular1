import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import {
  ComponentFixture,
  TestBed,
  flush,
  fakeAsync,
} from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { ActivatedRoute, convertToParamMap } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { PostDetailComponent } from "./post-detail.component";
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from "@angular/common/http";
import { Post } from "../model";
import { User } from "../model";

import { environment } from "src/environments/environment";
import { of } from "rxjs";
import { HttpServiceService } from "../services/http-service.service";

describe("PostDetailComponent", () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: HttpServiceService;
  let httpClientSpy: { post: jasmine.Spy; put: jasmine.Spy };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ id: 987 }) },
          },
        },
        HttpServiceService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PostDetailComponent);
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["post", "put"]);

    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = new HttpServiceService(httpClientSpy as any);

    const userTest: User = {
      name: "name test",
      email: "test@test.com",
      gender: "male",
      status: "active",
      id: 7465,
    };
    localStorage.setItem("currentUser", JSON.stringify(userTest));
    let user = JSON.parse(`${localStorage.getItem("currentUser")}`);

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("can test HttpClient.get", fakeAsync(() => {
    const postTest: Post = {
      title: "title of testing post",
      body: "body of testing post",
      id: 9876,
    };

    const testResponse = new HttpResponse({ body: postTest, status: 201 });
    spyOn(service, "getPostById").and.returnValue(of(testResponse));
    component.ngOnInit();
    flush();
    expect(201).toEqual(testResponse.status);
  }));

  it("can test for 404 error", () => {
    const emsg = "deliberate 404 error";
    const postTest: Post = {
      title: "title test",
      body: "body post test",
      id: 564,
    };

    httpClient.post<Post>(`${environment.postLink}/564`, postTest).subscribe({
      next: () => fail("should have failed with the 404 error"),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext("status").toEqual(404);
        expect(error.error).withContext("message").toEqual(emsg);
      },
    });

    const req = httpTestingController.expectOne(`${environment.postLink}/564`);

    req.flush(emsg, { status: 404, statusText: "Not Found" });
  });
});
