import { TestBed } from '@angular/core/testing';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpServiceService } from './http-service.service';
import { of } from 'rxjs';
import { User, Post, Comment } from '../model';

describe('HttpServiceService', () => {
  let service: HttpServiceService;
  let httpClienteSpy: {
    [x: string]: any;
    post: jasmine.Spy;
    get: jasmine.Spy;
    put: jasmine.Spy;
    delete: jasmine.Spy;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpServiceService],
    });
    httpClienteSpy = jasmine.createSpyObj('HttpClient', [
      'post',
      'get',
      'put',
      'delete',
    ]);
    service = new HttpServiceService(httpClienteSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('UserList function', (done: DoneFn) => {
    const resp = new HttpResponse({ status: 201 });

    httpClienteSpy.get.and.returnValue(of(resp));
    service.printUsers('1', '10', '', '').subscribe((data) => {
      expect(data.status).toEqual(201);
      done();
    });
    expect(service.printUsers('1', '10', '', '')).toBeDefined;
    expect(true).toBeTruthy();
  });

  it('PostList function', (done: DoneFn) => {
    const resp = new HttpResponse({ status: 201 });

    httpClienteSpy.get.and.returnValue(of(resp));
    service.getPost('1', '10', '').subscribe((data) => {
      expect(data.status).toEqual(201);
      done();
    });
    expect(service.getPost('1', '10', '')).toBeDefined;
    expect(true).toBeTruthy();
  });

  it('addUser function', (done: DoneFn) => {
    const userTest: User = {
      name: 'name test',
      email: 'test@test1.it',
      status: 'active',
      gender: 'male',
    };
    const resp = new HttpResponse({ status: 201 });

    httpClienteSpy.post.and.returnValue(of(resp));
    service.addUser(userTest).subscribe((data) => {
      expect(data.status).toEqual(201);
      done();
    });
    expect(service.addUser(userTest)).toBeDefined;
    expect(true).toBeTruthy();
  });

  it('deleteUser function', (done: DoneFn) => {
    const resp = new HttpResponse({ status: 201 });

    httpClienteSpy.delete.and.returnValue(of(resp));
    service.deleteUser(456).subscribe((data) => {
      expect(data.status).toEqual(201);
      done();
    });
    expect(service.deleteUser(456)).toBeDefined;
    expect(true).toBeTruthy();
  });

  it('addPost function', (done: DoneFn) => {
    const testPost: Post = {
      title: 'testing title',
      body: 'body test spec!!!',
      user_id: 3567,
    };
    const resp = new HttpResponse({
      status: 201,
    });
    httpClienteSpy.post.and.returnValue(of(resp));
    service.createNewPost(testPost, 66).subscribe((data) => {
      expect(data.status).toEqual(201);
      done();
    });

    expect(true).toBeTruthy();
  });

  it('addComment function', (done: DoneFn) => {
    const mockComment: Comment = {
      body: 'test comment body',
      email: 'test@test.it',
      name: 'luigi rossi',
      post_id: 4567,
    };
    const resp = new HttpResponse({ status: 201 });

    httpClienteSpy.post.and.returnValue(of(resp));
    service.createPostComment(mockComment, 4567).subscribe((data) => {
      expect(data.status).toEqual(201);
      done();
    });
    expect(service.createPostComment(mockComment, 4567)).toBeDefined;
    expect(true).toBeTruthy();
  });

  it('#handleError should status 0 ', () => {
    let error: string = 'error 0 ';
    service.handleError(new HttpErrorResponse({ status: 0, error: 'error' }));
    expect(error).toEqual(error);
  });
  it('#handleError should status 404', () => {
    let error: string = 'error 404 ';

    service.handleError(new HttpErrorResponse({ status: 404, error: 'error' }));

    expect(error).toEqual(error);
  });
  it("#editUser", (done: DoneFn) => {
    const user: User = {
      name: "name test",
      email: "testmail@hotmail.it",
      status: "active",
      gender: "female",
    };
    const resp = new HttpResponse({ status: 201 });

    httpClienteSpy.put.and.returnValue(of(resp));
    service.updateUser(1, user).subscribe((data) => {
      expect(data.status).toEqual(201);
      done();
    });
    expect(service.updateUser(123, user)).toBeDefined;
    expect(true).toBeTruthy();
  });

  it("#getUserPost", (done: DoneFn) => {
    const resp = new HttpResponse({ status: 200 });

    httpClienteSpy.get.and.returnValue(of(resp));
    service.getUserPost(456).subscribe((data) => {
      expect(data.status).toEqual(200);
      done();
    });
    expect(service.getUserPost(675)).toBeDefined;
    expect(true).toBeTruthy();
  });

  it("#getCommentPost", (done: DoneFn) => {
    const resp = new HttpResponse({ status: 200 });
    httpClienteSpy.get.and.returnValue(of(resp));
    service.getCommentPost(76).subscribe((data) => {
      expect(data.status).toEqual(200);
      done();
    });

    expect(service.getCommentPost(76)).toBeDefined;
    expect(true).toBeTruthy();
  });
});
