import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SearchBean } from './SearchBean';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public baseUrl: string = "http://agw.dev.search.acoustic.com/api/";

  //url = this.baseUrl + "search/search-with-get";
  //urlPost = this.baseUrl + "search/search-with-post";
  
  urlPost = environment.apiUrl + "search/search-with-post";
  url = environment.apiUrl + "search/search-with-get";


  router: Router;
  public searchList = [];
  httpClient: HttpClient;
  bean: SearchBean;
  //private params1: HttpParams;

  constructor(
    private http: HttpClient
  ) {  
    this.httpClient = http;
   }

   ngOnInit(): void {
    console.log('In ngOnInit of SearchService !!!');

 
  }

  onSearch(val: string): Observable<any[]> {
    console.log('inside onSearch');
    console.log('inside onSearch');
    console.log('environment.apiUrl:' + environment.apiUrl);

    //this.searchList = ['abc', 'xyz'];

    const params = new HttpParams()
    .set('q', val);

    
     return this.httpClient.get<any[]>(this.url, {'params': params});

    //return this.searchList;
  }

  onSearchPost(val: String): Observable<any[]> {

    console.log('inside onSearchPost');

    console.log('inside string:' + val);

    console.log('environment.apiUrl:' + environment.apiUrl);

    return this.httpClient.post<any[]>(this.urlPost, { "name": val});

    //return this.searchList;
  }
}
