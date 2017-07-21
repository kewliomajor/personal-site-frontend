import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiBaseService {
  protected baseUrl = 'http://default-environment.qhixrrzf67.us-east-1.elasticbeanstalk.com/api/v1/';
  // protected baseUrl = 'http://127.0.0.1:8000/api/v1/';

  constructor(protected http: Http) {

  }
}
