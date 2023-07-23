import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs';
import { Post } from '../model';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  isFetching: boolean = true;
  posts: Post[] = [];
  searchString: string;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  pageTotal: string;
  pageSize: string = '10';

  constructor(private http: HttpServiceService) {}

  ngOnInit(): void {
    this.getPost('1', '10', '');
  }

  getPost(page: string, forPage: string, string: string) {
    this.http.getPost(page, forPage, string).subscribe((data: any) => {
      this.searchString = string;
      this.posts = data.body;
      this.pageTotal = String(data.headers.get('X-Pagination-Total'));
      this.isFetching = false;
    });
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => {
          this.getPost(
            `${this.paginator.pageIndex + 1}`,
            `${this.paginator.pageSize}`,
            this.searchString
          );
        })
      )
      .subscribe();
  }
}
