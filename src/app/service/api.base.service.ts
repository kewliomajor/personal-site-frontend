import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';

@Injectable()
export class ApiBaseService {
  protected baseUrl = environment.baseUrl;

  constructor(protected http: Http) {

  }

  protected getHeaders() {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    if (localStorage.getItem('jwt') !== null) {
      headers.append('Authorization', 'Bearer ' + localStorage.getItem('jwt'));
    }
    return {headers: headers};
  }
}
