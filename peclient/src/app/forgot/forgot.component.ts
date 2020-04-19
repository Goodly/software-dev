import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  
  forgotForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { 
  	this.forgotForm = this.fb.group({
  		email: new FormControl(),
  	})
  }

  ngOnInit() {
  }

  reset() {
  	console.log("send reset password email");
  }

}
