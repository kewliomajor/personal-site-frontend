import {Component, OnInit} from '@angular/core';
import {PostService} from '../../service/post.service';
import {Post} from '../../model/post';
import {Subscription} from 'rxjs/Subscription';

@Component({
  providers: [PostService],
  selector: 'app-post',
  templateUrl: './post.component.html',
})
export class PostComponent implements OnInit {
  busy: Subscription;
  posts: Post[];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.busy = this.postService
      .getAll()
      .subscribe(posts => {
        this.posts = posts;
      });
  }
}
