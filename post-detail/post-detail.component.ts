import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Post, User, Comment } from '../model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  id_post = Number(this.route.snapshot.paramMap.get('id'));
  user: User = JSON.parse(`${localStorage.getItem('currentUser')}`);
  isFetching: boolean = true;

  post: Post = {
    title: '',
    body: '',
  };
  comments: Comment[] = [];
  addCommentBox: boolean;
  newComment: Comment = {
    post_id: this.id_post,
    name: '',
    email: '',
    body: '',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpServiceService
  ) {}

  ngOnInit(): void {
    this.http.getPostById(this.id_post).subscribe((response: any) => {
      this.post = response.body;
      this.isFetching = false;
    });
    this.loadComment();
  }

  loadComment() {
    this.http.getCommentPost(this.id_post).subscribe((data: any) => {
      this.comments = data.body;
    });
  }

  addNewComment() {
    this.newComment.name = this.user.name;
    this.newComment.email = this.user.email;
    console.log(this.newComment);
    this.http
      .createPostComment(this.newComment, this.id_post)
      .subscribe((data) => {
        this.loadComment();
      });
    this.addCommentBox = false;
    this.newComment.body = "";

  }
}
