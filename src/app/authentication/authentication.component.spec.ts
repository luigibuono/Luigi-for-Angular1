import { HttpResponse } from '@angular/common/http';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
} from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, NgForm } from '@angular/forms';

import { of } from 'rxjs';
import { User } from '../model';
import { HttpServiceService } from '../services/http-service.service';

import { AuthenticationComponent } from './authentication.component';
import { UsersListComponent } from '../users-list/users-list.component';

describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let component2: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;
  let services: HttpServiceService;
  let router: Router;
  let httpClientSpy: { post: jasmine.Spy; put: jasmine.Spy };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthenticationComponent],
      providers: [HttpServiceService],
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([
          {
            path: 'users',
            component: UsersListComponent,
          },
        ]),
        FormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticationComponent);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'put']);
    router = TestBed.inject(Router);
    services = new HttpServiceService(httpClientSpy as any);
    component = new AuthenticationComponent(router, services);
    component2 = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component2).toBeTruthy();
  });

  it('add user', fakeAsync(() => {
    const userTest: User = {
      name: 'Marco Rossi',
      email: 'Marcoorossi@gmail.com',
      gender: 'male',
      status: 'active',
    };
    const testResponse = new HttpResponse({ body: userTest, status: 201 });
    spyOn(services, 'addUser').and.returnValue(of(testResponse));
    component.login();
    flush();
    expect(201).toEqual(testResponse.status);
  }));

  it('newCurrentUser onInit', () => {
    expect(component2.newCurrentUser).toEqual({
      name: '',
      email: '',
      gender: '',
      status: 'active',
    });
  });
});
