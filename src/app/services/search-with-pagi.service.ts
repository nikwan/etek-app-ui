import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeeBean } from './Employee';
import { EtekResponse } from './EtekResponse';
import { SearchBean } from './SearchBean';
import { SearchBeanWrapper } from './SearchBeanWrapper';

@Injectable({
  providedIn: 'root'
})
export class SearchWithPagiService {
  public baseUrl: string = "http://agw.dev.search.acoustic.com/api/";

  url = "http://localhost:8077/acoustic-search/search-with-get";
  urlPost = "http://localhost:8077/acoustic-search/search-with-post";
  //urlPost1 = this.baseUrl + "search/search-with-paging";
  urlPost1 = environment.apiUrl + "employee/list";
  urlPost2 = environment.apiUrl + "employee/";
  addEmpUrl = environment.apiUrl + "employee/";

  //router: Router;
  public searchList = [];
  httpClient: HttpClient;
  bean: SearchBean[] = [];

  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')

  constructor(private http: HttpClient) { 
    this.httpClient = http;
  }

  searchWithPagi(val: String): Observable<SearchBean[]> {

    console.log('inside searchWithPagi');

    console.log('inside string:' + val);

    return this.httpClient.post<SearchBean[]>(this.urlPost, { "name": val});

  }

  searchWithServerPagi(val: String, pageSize: number, pageIndex: number): Observable<SearchBeanWrapper> {

    console.log('inside searchWithServerPagi');

    console.log('inside string:' + val);

    return this.httpClient.post<SearchBeanWrapper>(this.urlPost1, { "q": val, "limit": 10, "pageSize": pageSize, "pageNumber": pageIndex});

  }

  updateEmployee(body: EmployeeBean): Observable<EtekResponse> {

    console.log('inside updateEmployee');

    console.log('body:' + body);

    return this.httpClient.put<EtekResponse>(this.urlPost2, body, {'headers': this.headers});

  }

  getEmployee(id: number): Observable<EmployeeBean> {

    console.log('inside updateEmployee');

    console.log('id:' + id);

    return this.http.get<EmployeeBean>(this.urlPost2 + id, { 'headers': this.headers });

  }

  addEmployee(body: EmployeeBean): Observable<EtekResponse> {

    console.log('inside addEmployee');

    return this.httpClient.post<EtekResponse>(this.addEmpUrl, body, {'headers': this.headers});

  }

}
