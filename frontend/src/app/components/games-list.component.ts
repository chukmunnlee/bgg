import { AfterContentInit, AfterViewChecked, Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GetGame} from 'common/models/response';
import {AppService} from '../services/app.service';
import {BGGService} from '../services/bgg.service';
import {BaseComponent} from './base-component';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent extends BaseComponent implements OnInit {

	q = ''
	limit = 20
	offset = 0
	total = -1

	get hasNext() {
		return (this.offset + this.limit) < this.total
	}
	get hasPrev() {
		return this.offset > 0
	}

	games: GetGame[] = []

	constructor(private activateRoute: ActivatedRoute, private bggSvc: BGGService
			, appSvc: AppService, router: Router) { 
		super(appSvc, router)
	}

	ngOnInit(): void {

		this.q = this.activateRoute.snapshot.queryParams['q']
		this.offset = parseInt(this.activateRoute.snapshot.queryParams['offset']) || 0

		if (!this.q) {
			this.navigate(['/'])
			return
		}

		this.loadGames(this.q, this.limit, this.offset)

		this.sub$ = this.appSvc.back$.subscribe(() => {
			this.navigate(['/'])
		})
	}

	next() {
		this.offset += this.limit
		const queryParams = { q: this.q, offset: this.offset }
		this.navigate([ '/games', 'search' ], { queryParams })
			.then(() => this.loadGames(this.q, this.limit, this.offset))
	}

	prev() {
		let offset = this.offset - this.limit
		if (offset < 0)
			offset = 0
		this.offset = offset
		const queryParams = { q: this.q, offset }
		this.navigate([ '/games', 'search' ], { queryParams })
			.then(() => this.loadGames(this.q, this.limit, this.offset))
	}
	
	private loadGames(q: string, limit: number, offset: number): Promise<void> {
		return this.bggSvc.selectGamesByName(q, limit, offset)
			.then(result => {
				this.games = result.games
				this.limit = result.limit
				this.offset = result.offset
				this.total = result.total
			})
	}
}
