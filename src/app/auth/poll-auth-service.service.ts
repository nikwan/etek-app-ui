import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel } from '../models/auth/auth-model';
import { ApiEndpoints } from '../constants/api-endpoints';
import { EccResult } from '../models/ecc-result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollAuthService {

  public searchList = [];
  httpClient: HttpClient;
  //authModel: AuthModel[] = [];

  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')

  constructor(private http: HttpClient) { 
    this.httpClient = http;
  }

  pollAuth(rid: string, type: string): Observable<EccResult<AuthModel>> {
    console.log('inside pollAuth');
    return this.httpClient.post<EccResult<AuthModel>>(ApiEndpoints.poll_auth, {'rid': rid, 'type': type}, {'headers': this.headers});

  }
}
