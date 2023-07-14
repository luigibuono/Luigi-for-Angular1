import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, Post, Comment } from '../model';
import { HttpErrorResponse } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  setHeader() {
    let headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return headers;
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      alert(error.error[0].field + ' ' + error.error[0].message);
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  constructor(private http: HttpClient) {}

  printUsers(
    page: string,
    forPage: string,
    searchString: string,
    type: string
  ) {
    return this.http
      .get<User[]>(
        `${environment.userLink}?${type}=${searchString}&page=${page}&per_page=${forPage}`,
        {
          observe: 'response',
          headers: this.setHeader(),
        }
      )
      .pipe(catchError(this.handleError));
  }

  addUser(user: User) {
    return this.http
      .post(`${environment.userLink}`, user, {
        observe: 'response',
        headers: this.setHeader(),
      })
      .pipe(catchError(this.handleError));
  }

  getUserById(id: number) {
    return this.http
      .get<User>(`${environment.userLink}/${id}`, {
        observe: 'response',
        headers: this.setHeader(),
      })
      .pipe(catchError(this.handleError));
  }

  deleteUser(id: number) {
    return this.http
      .delete(`${environment.userLink}/${id}`, {
        observe: 'response',
        headers: this.setHeader(),
      })
      .pipe(catchError(this.handleError));
  }
  deletePost(id: number) {
    return this.http
      .delete(`${environment.postLink}/${id}`, {
        observe: 'response',
        headers: this.setHeader(),
      })
      .pipe(catchError(this.handleError));
  }

  getPost(page: string, forPage: string, searchString: string) {
    return this.http
      .get<Post[]>(
        `${environment.postLink}?title=${searchString}&page=${page}&per_page=${forPage}`,
        {
          observe: 'response',
          headers: this.setHeader(),
        }
      )
      .pipe(catchError(this.handleError));
  }

  getPostById(id: number) {
    return this.http
      .get<Post>(`${environment.postLink}/${id}`, {
        observe: 'response',
        headers: this.setHeader(),
      })
      .pipe(catchError(this.handleError));
  }

  getCommentPost(id: number) {
    return this.http
      .get<Comment[]>(`${environment.postLink}/${id}/comments`, {
        observe: 'response',
        headers: this.setHeader(),
      })
      .pipe(catchError(this.handleError));
  }

  getUserPost(id: number) {
    return this.http
      .get<Post[]>(`${environment.userLink}/${id}/posts`, {
        observe: 'response',
        headers: this.setHeader(),
      })
      .pipe(catchError(this.handleError));
  }

  createNewPost(post: any, id: number) {
    return this.http
      .post(`${environment.userLink}/${id}/posts`, post, {
        observe: 'response',
        headers: this.setHeader(),
      })
      .pipe(catchError(this.handleError));
  }
  createPostComment(comment: Comment, post_id: number) {
    return this.http
      .post(`${environment.postLink}/${post_id}/comments`, comment, {
        observe: 'response',
        headers: this.setHeader(),
      })
      .pipe(catchError(this.handleError));
  }

  updateUser(id: number, userEdit: User) {
    return this.http
      .put(`${environment.userLink}/${id}`, userEdit, {
        observe: 'response',
        headers: this.setHeader(),
      })
      .pipe(catchError(this.handleError));
  }
}
