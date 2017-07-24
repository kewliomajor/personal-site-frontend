import {Injectable} from '@angular/core';
import {ApiBaseService} from './api.base.service';
import {Observable} from 'rxjs/Observable';
import {Post} from '../model/post';

@Injectable()
export class PostService extends ApiBaseService {

  getAll(): Observable<Post[]> {
    return this.http
      .get(`${this.baseUrl}webapp/posts`, this.getHeaders())
      .map(response => response.json().data as Post[])
  }
}
