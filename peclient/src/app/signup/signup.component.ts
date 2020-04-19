import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { 
  	this.signupForm = this.fb.group({
  		email: new FormControl(),
  		pass: new FormControl(),
  		passAgain: new FormControl(),
  	})
  }

  ngOnInit() {
  }

  signup() {
  	console.log("sign up");
  }
}
