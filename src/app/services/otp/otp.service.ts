import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EccResult } from 'src/app/models/ecc-result';
import { ECCPoll } from 'src/app/models/eccpoll';
import { OtpModel } from 'src/app/models/otp.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  public baseUrl: string = "http://agw.dev.search.acoustic.com/api/";

  url = "http://localhost:8077/acoustic-search/search-with-get";
  urlPost = "http://localhost:8077/acoustic-search/search-with-post";
  //urlPost1 = this.baseUrl + "search/search-with-paging";
  urlotp = environment.apiUrl + "esign/otp";
  urlotpv = environment.apiUrl + "otpv";
  urlotpack = environment.apiUrl + "otpack";
  urlpoll = environment.apiUrl + "poll";
  rid = "123XSDRSS"

  //router: Router;
  public searchList = [];
  httpClient: HttpClient;
  otpModel: OtpModel[] = [];

  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
  
  constructor(private http: HttpClient) { 
    this.httpClient = http;
  }

  otp(body: OtpModel): Observable<EccResult<OtpModel>> {
    body.rid = this.rid;
    console.log('inside otp');
    return this.httpClient.post<EccResult<OtpModel>>(this.urlotp, body, {'headers': this.headers});

  }

  poll(type: string): Observable<EccResult<ECCPoll>> {
    //body.rid = this.rid;
    console.log('inside poll');
    return this.httpClient.post<EccResult<ECCPoll>>(this.urlpoll, {'rid': this.rid, 'type': type}, {'headers': this.headers});

  }
}
