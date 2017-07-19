import {Component, OnInit, ViewChild} from '@angular/core';
import {PostService} from './service/post.service';
import {Post} from './model/post';
import {MenuComponent} from './admin-components/menu/menu.component';

@Component({
  providers: [PostService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private posts: Post[];

  @ViewChild(MenuComponent)
  private menuComponent: MenuComponent;

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
    this.menuComponent.setNumPosts(this.posts.length);
  }
}
