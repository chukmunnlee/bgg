import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GetGame} from 'common/models/response';
import {BGGService} from '../services/bgg.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

	q = ''
	limit = 20
	offset = 0

	games: GetGame[] = []

	constructor(private router: Router, private activateRoute: ActivatedRoute
			, private bggSvc: BGGService) { }

	ngOnInit(): void {

		if (!this.q) {
		  this.router.navigate([ '/' ])
		  return
		}

		this.bggSvc.selectGamesByName(this.q, this.limit, this.offset)
			.then(result => {
				this.games = result
				console.info('>>> games = ', result)
			})
			.catch(error => {
				console.error('>>> error: ', error)
			})
	}

	next() {
	}

	prev() {
	}
}
