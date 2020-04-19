import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(
  	private http: HttpClient
  ) { }

  doSend() {
  	return this.http.get('api/article/s3');
  }

  doBuzz() {
  	return this.http.get('api/article/buzz2');
  }
}
