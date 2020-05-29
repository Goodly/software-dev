import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { DashboardService } from './dashboard.service';
import { Article } from './article';
import { Status } from './article';
//import { TSMap } from "typescript-map";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('articleText', {static: false}) articleText: ElementRef;
  dashboardForm: FormGroup;
  articles: any = [];
  stringSearched: string = "";
  statuses: any = [];
  articleDetails: any = [];
  articleShow: boolean[] = [];


  constructor(
  	private ds: DashboardService,
  	private fb: FormBuilder,
  ) { 
  	this.dashboardForm = this.fb.group({
  		statusFilter: new FormControl(),
  		searchType: new FormControl(),
  		searchUrl: new FormControl(),
		searchTitle: new FormControl(),
		checkAll: new FormControl(),
		bulkStatus: new FormControl(),
	});

	// load list of statuses
	this.ds.getStatuses().subscribe((data: Status) => {
		this.statuses = data;
		console.log(this.statuses);
	});
	  
	this.dashboardForm.get('statusFilter').valueChanges.subscribe(val => {
		console.log("filter value has changed", val)
		if (val == "all")
		{
			this.ds.getArticles().subscribe((data: Article) => {
				this.articles = data;
				for(let x = 0; x < this.articles.size; x++) {
					this.articleShow[x] = false;
				}
  			});
		} else
		{
			this.ds.searchByStatus(val).subscribe((data: Article) => {
				this.articles = data;
				if(val == "popular")
				{
					console.log("hi");
				//there's no field for publishedDate so I'm using publishDate instead
				//sorting by date
					this.articles.sort(
		  	  			function(a, b) {
							if (a.publishDate < b.publishDate) {
								return 1;
							}
							if (a.publishDate > b.publishDate) {
								return -1;
							}
						return 0;
				});
				//showing articles 0-49
				for(let i = this.articles.length - 1; i >= 50;i--) 
				{
				this.articles.splice(i, 1);
				}
			}
			});
		}
	});

	//checkall
	this.dashboardForm.get('checkAll').valueChanges.subscribe(v => {
		//console.log("toggling all checkboxes - checked = ", v);
	 	let checkboxes = document.getElementsByName("articleCheckbox");
	 	//console.log(checkboxes);
	  	checkboxes.forEach(cb => {
	  		let cbe = cb as HTMLInputElement;
  			//console.log("toggling checkbox", cbe);
  			cbe.checked = v;
	  	})
	});
  }

  submitBulk() {
  		let newStatus = this.dashboardForm.get('bulkStatus').value;
  		console.log("submitting all checked for status change to ", newStatus);
	 	let checkboxes = document.getElementsByName("articleCheckbox");
	  	checkboxes.forEach(cb => {
	  		let cbe = cb as HTMLInputElement;
  			if (cbe.checked)  
					// cbe.value contains the id of the checkbox (the is of the article)
  					this.bulkChangeStatus(cbe.value, newStatus);
	  	})
  }
  
  ngOnInit() {
  	console.log("dashboard initialized");
	this.ds.getArticles().subscribe((data: Article) => {
		this.articles = data;
		for(let x = 0; x < this.articles.size; x++) {
			this.articleShow[x] = false;
		}
  	});
  	this.dashboardForm.get('statusFilter').setValue("all");
  }

  loadArticleText(id: number) {
  	console.log("aaaaaaaaaa", id);
  	let art: Article = this.articles.find(a => a.id == id);
  	if (art)
  		this.articleText.nativeElement.innerHTML = art.articleText;
  }
  
  sortOrderDate: boolean = true;
  sortTitle: boolean = true;
  sortURL: boolean = true;
  sortStatus: boolean = true;
  sortTotal: boolean = true;
  sortChecks: boolean = true;

  onClick(s:string)
  {
    if(s === "dateAdded")
    {
  	  	if (this.sortOrderDate) {
	  		this.articles.sort(
	  	  		function(a, b) {
					if (a.publishDate < b.publishDate) {
						return -1;
					}
					if (a.publishDate > b.publishDate) {
						return 1;
					}
					return 0;
			});
		} else {
			this.articles.sort(
	  	  		function(a, b) {
					if (a.publishDate < b.publishDate) {
						return 1;
					}
					if (a.publishDate > b.publishDate) {
						return -1;
					}
					return 0;
			});
		}
		this.sortOrderDate = !this.sortOrderDate;
	}
	if(s === "title")
    {
  	  	
  	  	if (this.sortTitle) {
	  		this.articles.sort(function(a, b) {
					if (a.articleTitle < b.articleTitle) {

						return -1;
					}
					if (a.articleTitle > b.articleTitle) {
						return 1;
					}
					return 0;
			});
		} else {
			this.articles.sort(
	  	  		function(a, b) {
					if (a.articleTitle < b.articleTitle) {
						return 1;
					}
					if (a.articleTitle > b.articleTitle) {
						return -1;
					}
					return 0;
			});
		}
		this.sortTitle = !this.sortTitle;
	}
	if(s === "URL")
    {
  	  	
  	  	if (this.sortURL) {
	  		this.articles.sort(function(a, b) {
					if (a.url < b.url) {

						return -1;
					}
					if (a.url > b.url) {
						return 1;
					}
					return 0;
			});
		} else {
			this.articles.sort(
	  	  		function(a, b) {
					if (a.url < b.url) {
						return 1;
					}
					if (a.url > b.url) {
						return -1;
					}
					return 0;
			});
		}
		this.sortURL = !this.sortURL;
	}
	if(s === "status")
    {
  	  	
  	  	if (this.sortStatus) {
	  		this.articles.sort(function(a, b) {
					if (a.statuses[0].statusCode < b.statuses[0].statusCode) {
						return -1;
					}
					if (a.statuses[0].statusCode > b.statuses[0].statusCode) {
						return 1;
					}
					return 0;
			});
		} else {
			this.articles.sort(
	  	  		function(a, b) {
					if (a.statuses[0].statusCode < b.statuses[0].statusCode) {
						return 1;
					}
					if (a.statuses[0].statusCode > b.statuses[0].statusCode) {
						return -1;
					}
					return 0;
			});
		}
		this.sortStatus = !this.sortStatus;
	}
		if(s === "totalShares")
    {
  	  	
  	  	if (this.sortTotal) {
	  		this.articles.sort(function(a, b) {
					if (a.totalShares < b.totalShares) {
						return -1;
					}
					if (a.totalShares > b.totalShares) {
						return 1;
					}
					return 0;
			});
		} else {
			this.articles.sort(
	  	  		function(a, b) {
					if (a.totalShares < b.totalShares) {
						return 1;
					}
					if (a.totalShares > b.totalShares) {
						return -1;
					}
					return 0;
			});
		}
		this.sortTotal = !this.sortTotal;
	}
	if(s === "sortChecks")
    {
		let checkboxes = document.getElementsByName("articleCheckbox");
		console.log(checkboxes.length);
		for(var ch; ch < checkboxes.length;ch++)
		{
			console.log(ch);
		}
	  	checkboxes.forEach(cb => {
	  		let cbe = cb as HTMLInputElement;
	  	})

		this.sortChecks = !this.sortChecks;
	}
  }

  toggle(i:number) {
  	this.articleShow[i] = !this.articleShow[i];
  }

  searchUrl() {
  	this.ds.searchByUrl(this.dashboardForm.get('searchUrl').value).subscribe((data: Article) => {
  		this.articles = data;
  	})
  }

  searchTitle() {
  	this.ds.searchByTitle(this.dashboardForm.get('searchTitle').value).subscribe((data: Article) => {
  		this.articles = data;
  	})
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
	
	//val contains the $event from the html
	// one of the properties of event is srcElement (an html DOM object)
	// this object's value is the new value 
	changeStatus(id: number, val) {
		this.ds.setStatus(id, val.srcElement.value).subscribe((data: Article) => {
			this.ds.getArticles().subscribe((data: Article) => {
				this.articles = data;
  			});
		});
	}

	//number = id, val = status

	bulkChangeStatus(number, val) {
		this.ds.setStatus(number, val).subscribe((data: Article) => {
			this.ds.getArticles().subscribe((data: Article) => {
				this.articles = data;
  			});
		});
	}


  
}