import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiBaseService {
  protected baseUrl = 'https://d1zo9hil5ubb63.cloudfront.net/api/v1/';
  // for getting requests stuck
  // protected baseUrl = 'https://default-environment.qhixrrzf67.us-east-1.elasticbeanstalk.com/';
  // protected baseUrl = 'http://127.0.0.1:8000/api/v1/';

  constructor(protected http: Http) {

  }
}
