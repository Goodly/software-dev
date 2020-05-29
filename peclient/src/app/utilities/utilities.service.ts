import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  apiDest: string = "";
  constructor(
    private http: HttpClient
  ) { 
    
    if (environment.production) {
      this.apiDest = '/api';
    } else {
      this.apiDest = '/dev';
    }


  }

  doSend() {
  	return this.http.get(this.apiDest + '/article/s3')
  }

  doBuzz() {
  	return this.http.get(this.apiDest + '/article/buzz2');
  }

  doMetrics() {
    return this.http.get(this.apiDest + '/article/update')
  }
}
 