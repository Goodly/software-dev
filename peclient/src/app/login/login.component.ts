import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
  	private fb: FormBuilder,
    private router: Router
  ) { 
  	this.loginForm = this.fb.group({
  		login: new FormControl(),
  		pass: new FormControl(),
  	});
  }

  ngOnInit() {
  }

  login() {
  	console.log("submitting login");
    this.router.navigate(['/dashboard']);
  }

  forgot() {
  	console.log("forgot");
  }

  signup() {
  	console.log("signup");
  }

}
