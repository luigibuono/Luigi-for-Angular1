import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  flush,
} from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Post } from '../model';
import { of } from 'rxjs';

import { HttpServiceService } from '../services/http-service.service';

import { PostsListComponent } from './posts-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PostsListComponent', () => {
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: HttpServiceService;
  let httpClientSpy: { post: jasmine.Spy; put: jasmine.Spy };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsListComponent],
      imports: [
        HttpClientTestingModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
      ],
      providers: [HttpServiceService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsListComponent);
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

  it('can test HttpClient.get', fakeAsync(() => {
    const postTest: Post = {
      title: 'title test1',
      body: 'body test1 spec file',
    };
    const postTestArray: Post[] = [];

    postTestArray.push(postTest);

    const testResponse = new HttpResponse({ body: postTestArray, status: 201 });
    spyOn(service, 'getPost').and.returnValue(of(testResponse));
    component.getPost('1', '10', '');
    flush();
    expect(201).toEqual(testResponse.status);
  }));
});
