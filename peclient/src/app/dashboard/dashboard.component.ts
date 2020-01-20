import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { DashboardService } from './dashboard.service';
import { Article } from './article';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardForm: FormGroup;
  articles: Article;
  stringSearched: string = "";
  statuses: Array<Status> = [];

  constructor(
  	private ds: DashboardService,
  	private fb: FormBuilder,
  ) { 
  	this.dashboardForm = this.fb.group({
  		statusFilter: new FormControl(),
  		searchType: new FormControl(),
  		searchString: new FormControl(),

	  });
  }
  
  
  ngOnInit() {
	this.ds.getArticles().subscribe((data: Article) => {
		this.articles = data;
		console.log(this.articles);
		alert("hiiiiii");
  	});
	
	this.ds.getStatuses().subscribe((data: Status) => {
		this.statuses = data;
		console.log(this.statuses);
	});
  }

  search() {
	console.log("searching");
	this.dashboardForm.get('statusFilter').reset();
	this.stringSearched = this.dashboardForm.get('searchString').value
	this.ds.searchByTitle(this.stringSearched)
		.subscribe((data: Article) => {
			this.articles = data;
		}
  	);

  }

  filterByStatus(filterVal: any) {
	this.stringSearched = '';
	if (filterVal == "all")
		this.ds.getArticles().subscribe((data: Article) => {
			this.articles = data;
  		});
	else
		this.ds.searchByStatus(this.dashboardForm.get('statusFilter').value)
			.subscribe((data: Article) => {
				this.articles = data;
			}
		);
}
  
}