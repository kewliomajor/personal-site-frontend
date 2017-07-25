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

  userIsLoggedIn(): boolean {
    return localStorage.getItem('jwt') !== null;
  }

  private mapAndSetJwt(response) {
    const jwt = response.json().data as Jwt;
    localStorage.setItem('jwt', jwt.jwt);
    return jwt;
  }
}
