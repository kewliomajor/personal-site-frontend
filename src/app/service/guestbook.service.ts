import {Injectable} from '@angular/core';
import {ApiBaseService} from './api.base.service';
import {Observable} from 'rxjs/Observable';
import {Post} from '../model/post';
import {GuestNote} from "../model/guest_note";

@Injectable()
export class GuestbookService extends ApiBaseService {

  getAll(): Observable<GuestNote[]> {
    return this.http
      .get(`${this.baseUrl}webapp/auth/guestbook`, this.getHeaders())
      .map(response => response.json().data as GuestNote[])
  }
}
