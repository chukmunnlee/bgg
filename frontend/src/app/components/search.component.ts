import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AppService} from '../services/app.service';
import {BaseComponent} from './base-component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent extends BaseComponent implements OnInit {

	form!: FormGroup

	constructor(private fb: FormBuilder, router: Router, appSvc: AppService) { 
		super(appSvc, router)
	}

	ngOnInit(): void {
		this.form = this.fb.group({
		  q: this.fb.control('', [ Validators.required, Validators.minLength(2) ])
		})
		this.sub$ = this.appSvc.back$.subscribe(() => {
			this.home()
		})
	}

	search() {
		const queryParams = { q: this.form.value['q'] }
		this.navigate([ '/games', 'search' ], { queryParams })
	}

}
