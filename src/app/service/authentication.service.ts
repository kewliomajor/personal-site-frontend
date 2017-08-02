import {Injectable} from '@angular/core';
import {ApiBaseService} from './api.base.service';
import {Observable} from 'rxjs/Observable';
import {JwtUser} from '../model/jwt_user';
import {User} from "../model/user";

@Injectable()
export class AuthenticationService extends ApiBaseService {

  login(data): Observable<JwtUser> {
    return this.http
      .post(`${this.baseUrl}auth/login`, data, this.getHeaders())
      .map(response => this.mapAndSetJwt(response))
  }

  register(data): Observable<JwtUser> {
    return this.http
      .post(`${this.baseUrl}auth/register`, data, this.getHeaders())
      .map(response => this.mapAndSetJwt(response))
  }

  getProfile(): Observable<User> {
    return this.http
      .get(`${this.baseUrl}webapp/auth/profile`, this.getHeaders())
      .map(response => response.json().data as User)
  }

  updateProfile(data): Observable<User> {
    return this.http
      .post(`${this.baseUrl}webapp/auth/profile`, data, this.getHeaders())
      .map(response => response.json().data as User)
  }

  clearCookies() {
    this.cookieMonsterService.clear();
  }

  private mapAndSetJwt(response) {
    const jwt = response.json().data as JwtUser;
    this.cookieMonsterService.put(jwt.jwt);
    return jwt;
  }
}
