import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import {Jwt} from '../model/jwt';

@Injectable()
export class ApiBaseService {
  protected baseUrl = environment.baseUrl;

  constructor(protected http: Http) {

  }
}
