import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from './article';
import { Status } from './article';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  
  apiDest: string = "";
  constructor(
  	private http: HttpClient
  ) { 
    
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    console.log(process.env);
    console.log(process.env.ENVIRONMENT_FLAG);

    var eee = process.env.ENVIRONMENT_FLAG || 'development';
    console.log('eeeeeeeeeeeee', eee);

    if (environment.production) {
      this.apiDest = '/api';
      console.log("PRODPRODPROD");
    } else {
      this.apiDest = '/dev';
      console.log("DEVDEVDEVDEV")
    }



  }

  

  getArticles() {
  	return this.http.get<Article>(this.apiDest + '/article/');
  }

  getStatuses() {
  	return this.http.get<Status>(this.apiDest + '/status/');
  }
  searchByStatus(statusCode: string) {
    if(!statusCode || statusCode == "popular")
    {
      return this.http.get<Article>('/api/article/');
    }
  	return this.http.get<Article>('/api/article?status=' + statusCode);
  }

  searchByTitle(title: string) {
  	return this.http.get<Article>(this.apiDest + '/article?title=' + title);
  }

  searchByUrl(url: string) {
  	return this.http.get<Article>(this.apiDest + '/article?title=' + url);
  }

  setStatus(id: number, status: string) {
    return this.http.post(this.apiDest + '/article/' + id + '/status/' + status, null);
  }

}
