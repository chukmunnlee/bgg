import {Location} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GetGameByGid} from 'common/models/response';
import {AppService} from '../services/app.service';
import {BGGService} from '../services/bgg.service';
import {BaseComponent} from './base-component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent extends BaseComponent implements OnInit {

	gid = ''
	game!: Partial<GetGameByGid>

	constructor(private bggSvc: BGGService, private location: Location
				, private activatedRoute: ActivatedRoute, appSvc: AppService, router: Router) { 
		super(appSvc, router)
	}

	ngOnInit(): void {
		this.gid = this.activatedRoute.snapshot.params['gid']
		this.bggSvc.selectGameById(parseInt(this.gid))
			.then(result => this.game = result)
		this.sub$ = this.appSvc.back$.subscribe(() => {
		  this.location.back()
		})
	}

}
