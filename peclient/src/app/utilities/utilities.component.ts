import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { UtilitiesService } from './utilities.service';

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.css']
})
export class UtilitiesComponent implements OnInit {

  utilitiesForm: FormGroup;

  constructor(
  	private fb: FormBuilder,
  	private us: UtilitiesService,
  ) { 

  	this.utilitiesForm = this.fb.group({
  		sendResults: new FormControl(),
  		buzzResults: new FormControl(),
  	});
  }

  ngOnInit() {
  }

  sendAcceptedToS3() {
  	this.us.doSend().subscribe(d => {
  		this.utilitiesForm.get('sendResults').setValue(d);
  	})
  }

  getBuzzSumo() {
  	this.us.doBuzz().subscribe(d => {
  		this.utilitiesForm.get('buzzResults').setValue(d);
  	})
  }

}
