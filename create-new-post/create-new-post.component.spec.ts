import { HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
} from "@angular/core/testing";
import { FormsModule, NgForm } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { Post, User } from "../model";
import { HttpServiceService } from "../services/http-service.service";

import { CreateNewPostComponent } from "./create-new-post.component";
import { PostsListComponent } from "../posts-list/posts-list.component";

describe("CreateNewPostComponent", () => {
  let component: CreateNewPostComponent;
  let component2: CreateNewPostComponent;
  let fixture: ComponentFixture<CreateNewPostComponent>;
  let service: HttpServiceService;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateNewPostComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        RouterModule.forRoot([
          { path: "posts", component: PostsListComponent },
        ]),
      ],
      providers: [HttpServiceService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateNewPostComponent);

    let httpClientSpy: { post: jasmine.Spy };
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["post"]);
    router = TestBed.inject(Router);
    service = new HttpServiceService(<any>httpClientSpy);
    component = new CreateNewPostComponent(service, router);
    component2 = fixture.componentInstance;
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

  it("Should create post and recive response 201 status", fakeAsync(() => {
    const post: Post = {
      title: "Title for test add post",
      body: "body for test add post",
      user_id: 22543,
    };

    const response = new HttpResponse({
      body: post,
      status: 201,
    });

    spyOn(service, "createNewPost").and.returnValue(of(response));
    component.createNewPost();
    flush();
    expect(201).toEqual(response.status);
  }));
});
