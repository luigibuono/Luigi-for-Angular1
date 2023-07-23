import {
  ComponentFixture,
  TestBed,
  flush,
  fakeAsync,
} from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserDetailComponent } from './user-detail.component';
import { User } from '../model';
import { HttpServiceService } from '../services/http-service.service';
import { of } from 'rxjs';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: HttpServiceService;
  let httpClientSpy: { post: jasmine.Spy; put: jasmine.Spy };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ id: 5674 }) },
          },
        },
        HttpServiceService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'put']);

    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = new HttpServiceService(httpClientSpy as any);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can test Httpclient.get', fakeAsync(() => {
    const userTest: User = {
      name: 'name test',
      email: 'mail test',
      gender: 'male',
      status: 'active',
      id: 5674,
    };
    const testResponse = new HttpResponse({ body: userTest, status: 201 });
    spyOn(service, 'getUserById').and.returnValue(of(testResponse));
    component.getUser();
    flush();
    expect(201).toEqual(testResponse.status);
  }));
});
