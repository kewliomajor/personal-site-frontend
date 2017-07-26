import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import {CookieMonsterService} from './cookie_monster.service';

@Injectable()
export class ApiBaseService {
  protected baseUrl = environment.baseUrl;

  constructor(protected http: Http, protected cookieMonsterService: CookieMonsterService) {}

  userIsLoggedIn(): boolean {
    return this.cookieMonsterService.get() !== undefined;
  }

  protected getHeaders() {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    if (this.userIsLoggedIn()) {
      headers.append('Authorization', 'Bearer ' + this.cookieMonsterService.get());
    }
    return {headers: headers};
  }
}
