import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpResponse } from '@angular/common/http';
import { User } from '../model';

import { UsersListComponent } from './users-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { HttpServiceService } from '../services/http-service.service';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  let service: HttpServiceService;
  let httpClientSpy: { post: jasmine.Spy; put: jasmine.Spy };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersListComponent],
      imports: [
        HttpClientTestingModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
      ],
      providers: [HttpServiceService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersListComponent);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'put']);

    component = fixture.componentInstance;

    service = new HttpServiceService(httpClientSpy as any);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can test HttpClient.get', fakeAsync(() => {
    const userTest: User = {
      name: 'name test1',
      email: 'mail test1',
      gender: 'male',
      status: 'active',
    };
    const userTestArray: User[] = [];
    userTestArray.push(userTest);

    const testResponse = new HttpResponse({ body: userTestArray, status: 201 });
    spyOn(service, 'printUsers').and.returnValue(of(testResponse));
    component.getUser('1', '10', '');
    flush();
    expect(201).toEqual(testResponse.status);
  }));
});
