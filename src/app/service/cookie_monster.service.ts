import {Injectable} from '@angular/core';
import {CookieService} from 'angular2-cookie/core';

@Injectable()
export class CookieMonsterService {
  private jwtKey = 'cccp_jwt';

  constructor(private cookieService: CookieService) {}

  public get() {
    return this.cookieService.get(this.jwtKey);
  }

  public put(value) {
    return this.cookieService.put(this.jwtKey, value);
  }

  public clear() {
    this.cookieService.remove(this.jwtKey);
  }
}
