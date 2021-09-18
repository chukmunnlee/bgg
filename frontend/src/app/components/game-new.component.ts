import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import {BaseComponent} from './base-component';

import { AppService } from '../services/app.service'
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Game} from 'common/models/entity';

@Component({
  selector: 'app-game-new',
  templateUrl: './game-new.component.html',
  styleUrls: ['./game-new.component.css']
})
export class GameNewComponent extends BaseComponent implements OnInit {

	form!: FormGroup

	constructor(private fb: FormBuilder, appSvc: AppService, router: Router) { 
		super(appSvc, router)
	}

	ngOnInit(): void { 
		this.form = this.fb.group({
			name: this.fb.control('', [ Validators.required, Validators.minLength(2) ]),
			year: this.fb.control('', [ Validators.required ]),
			ranking: this.fb.control('-1', [ Validators.min(-1) ]),
			usersRated: this.fb.control('0', [ Validators.min(0) ]),
			url: this.fb.control('', [ Validators.required ]),
			image: this.fb.control('')
		})

		this.sub$ = this.appSvc.back$.subscribe(() => {
			this.home()
		})
	}

	addGame() {
		const game = this.form.value as Game
		console.info('>>> game: ', game)
	}

}
