import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiBaseService {
  protected baseUrl = 'https://rfdkizpb8h.execute-api.us-east-1.amazonaws.com/production';

  constructor(protected http: Http) {

  }
}
