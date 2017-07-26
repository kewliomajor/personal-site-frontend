import {Injectable} from '@angular/core';
import {ApiBaseService} from './api.base.service';
import {Observable} from 'rxjs/Observable';
import {Jwt} from '../model/jwt';

@Injectable()
export class AuthenticationService extends ApiBaseService {

  login(username, password): Observable<Jwt> {
    const paramString = '?username=' + username + '&password=' + password;
    return this.http
      .get(`${this.baseUrl}auth/login` + paramString, this.getHeaders())
      .map(response => this.mapAndSetJwt(response))
  }

  register(data): Observable<Jwt> {
    return this.http
      .post(`${this.baseUrl}auth/register`, data, this.getHeaders())
      .map(response => this.mapAndSetJwt(response))
  }

  clearCookies() {
    this.cookieMonsterService.clear();
  }

  private mapAndSetJwt(response) {
    const jwt = response.json().data as Jwt;
    this.cookieMonsterService.put(jwt.jwt);
    return jwt;
  }
}
