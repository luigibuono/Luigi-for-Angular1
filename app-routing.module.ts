import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { UsersListComponent } from './users-list/users-list.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { CreateNewUserComponent } from './create-new-user/create-new-user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { CreateNewPostComponent } from './create-new-post/create-new-post.component';
import { MysocialsComponent } from './mysocials/mysocials.component';

const routes: Routes = [

  { path: '', component: AuthenticationComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'posts', component: PostsListComponent },
  { path: 'mysocials', component: MysocialsComponent },
  { path: 'new-user', component: CreateNewUserComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: 'new-post', component: CreateNewPostComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
