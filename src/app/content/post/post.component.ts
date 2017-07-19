import {Component, OnInit} from '@angular/core';
import {PostService} from '../../service/post.service';
import {Post} from '../../model/post';

@Component({
  providers: [PostService],
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: Post[];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService
      .getAll()
      .subscribe(posts => {
        this.posts = posts;
      });
  }
}
