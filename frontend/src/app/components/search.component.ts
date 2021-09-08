import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

	form!: FormGroup

	constructor(private fb: FormBuilder, private router: Router) { }

	ngOnInit(): void {
		this.form = this.fb.group({
		  q: this.fb.control('', [ Validators.required, Validators.minLength(2) ])
		})
	}

	search() {
		const queryParams = { 'q': this.form.value['q'] }
		this.router.navigate([ '/games/search' ], { queryParams })
			.catch(error => {
				console.error('Navigation error: ', error)
			})
	}

}
