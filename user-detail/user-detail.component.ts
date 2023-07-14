import { Component, OnInit } from '@angular/core';
import { User } from '../model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from '../services/http-service.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  selectedUser: User;
  userEdit: User;
  openPopUpDelete: boolean = false;
  openPopUpEdit: boolean = false;

  posts: any = [];
  seePost: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpServiceService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getPost();
  }

  getUser() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.http.getUserById(id).subscribe((data: any) => {
      this.selectedUser = data.body;
    });
  }
  getPost() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.http.getUserPost(id).subscribe((response) => {
      this.posts = response.body;
    });
  }

  deleteUser() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.http.deleteUser(id).subscribe();
    setTimeout(() => {
      this.router.navigate(['/users']);
    }, 1000);
  }

  clickUserEdit() {
    this.openPopUpEdit = true;
    this.userEdit = this.selectedUser;
    this.getUser();
  }

  goBack() {
    console.log(this.userEdit);
    this.openPopUpEdit = false;
  }

  editUser() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.http
      .updateUser(id, this.userEdit)
      .subscribe((data) => console.log(data.body));
    setTimeout(() => {
      this.router.navigate(['/users']);
    }, 1000);
  }
}
