import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-new-post',
  templateUrl: './create-new-post.component.html',
  styleUrls: ['./create-new-post.component.css'],
})
export class CreateNewPostComponent implements OnInit {
  newPost: any = {
    title: '',
    body: '',
    userId: undefined,
  };
  response: string;
  constructor(private http: HttpServiceService, private router: Router) {}

  ngOnInit(): void {}

  createNewPost() {
    let user = JSON.parse(`${localStorage.getItem('currentUser')}`);
    this.newPost.userId = user.id;
    this.http.createNewPost(this.newPost, user.id).subscribe((data) => {
      if (data.status == 201) {
        this.response = 'New post has been created';
        setTimeout(() => {
          this.router.navigate(['/posts']);
        }, 1500);
      }
    });
  }
}
