import { Component, OnInit } from '@angular/core';
import {PostService} from '../../service/post.service';
import {Post} from '../../model/post';

@Component({
  providers: [PostService],
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  Title: String;
  Date: String;
  Text: String;
  private posts: Post[];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService
      .getAll()
      .subscribe(posts => {
        this.posts = posts;
        this.configurePosts();
      });
  }

  configurePosts() {
    for (const post of this.posts) {
      this.Title = post.title;
      this.Date = post.created;
      this.Text = post.text;
    }
  }

}
