import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from './article';
import { Status } from './article';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  
  constructor(
  	private http: HttpClient
  ) { }

  

  getArticles() {
  	return this.http.get<Article>('/api/article/');
  }

  getStatuses() {
  	return this.http.get<Status>('/api/status/');
  }
  searchByStatus(statusCode: string) {
    if(statusCode == "all" || statusCode == "popular")
    {
      return this.http.get<Article>('/api/article/');
    }
  	return this.http.get<Article>('/api/article?status=' + statusCode);
  }

  searchByTitle(title: string) {
  	return this.http.get<Article>('/api/article?title=' + title);
  }

  searchByUrl(url: string) {
  	return this.http.get<Article>('/api/article?title=' + url);
  }

  setStatus(id: number, status: string) {
    return this.http.post('/api/article/' + id + '/status/' + status, null);
  }

}
