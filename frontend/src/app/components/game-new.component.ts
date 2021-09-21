import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import {BaseComponent} from './base-component';

import { AppService } from '../services/app.service'
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Game} from 'common/models/entity';
import {CanLeaveForm} from '../services/form-guard.service';
import {BGGService} from '../services/bgg.service';
import {InsertGame} from 'common/models/response';

@Component({
  selector: 'app-game-new',
  templateUrl: './game-new.component.html',
  styleUrls: ['./game-new.component.css']
})
export class GameNewComponent extends BaseComponent implements OnInit, CanLeaveForm {

	form!: FormGroup

	constructor(private fb: FormBuilder, private bggSvc: BGGService
			, appSvc: AppService, router: Router) { 
		super(appSvc, router)
	}

	ngOnInit(): void { 
		this.form = this.fb.group({
			name: this.fb.control('', [ Validators.minLength(2) ]),
			year: this.fb.control((new Date()).getFullYear()),
			ranking: this.fb.control(-1),
			usersRated: this.fb.control(0),
			url: this.fb.control(''),
			image: this.fb.control('')
		})

		this.sub$ = this.appSvc.back$.subscribe(() => {
			this.home()
		})
	}

	addGame() {
		const game = this.form.value as Game
		game.year = parseInt(this.form.value['year'])
		this.bggSvc.insertGame(game)
			.then(result => {
				this.form.reset()
				return this.home()
			})
	}

	canDeactivate() {
		if (this.form.pristine)
			return true
		return new Promise<boolean>((resolve, reject) => {
			resolve(confirm('You have unsaved data.\nAre you sure you wish to leave?'))
		})
	}

}
