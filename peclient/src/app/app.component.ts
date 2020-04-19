import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'peclient';
  constructor(private elementRef: ElementRef) {
  	let cognitoEndpoint = this.elementRef.nativeElement.getAttribute('cognitoEndpoint');
  }
}
