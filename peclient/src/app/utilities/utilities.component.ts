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
  	this.us.doSend().subscribe(
      res => {
        console.log("response ", res)
        //console.log(d);
        this.utilitiesForm.get('sendResults').setValue("fffffffffff");
      },
      err => {
        console.log("errrrrr", err);

        console.log(err.ok);
        console.log(err.status);
        console.log(err.statusText);
        console.log(err.error.text);
        this.utilitiesForm.get('sendResults').setValue(err.error.text);
      },
      () => {
        
      });
  }

  getBuzzSumo() {
  	this.us.doBuzz().subscribe(d => {
      console.log("qqqqqqqqqqqqqqqqqqqq");
      console.log(d);
  		let r: string = "";
      for (let [key, value] of Object.entries(d)) {
        r = r + `${key}: ${value}` + "\n";
      }

      this.utilitiesForm.get('buzzResults').setValue(r);
  	})
  }

}
