import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {BaseComponent} from './components/base-component';
import {AppService} from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent {

	constructor(appSvc: AppService, router: Router) { 
		super(appSvc, router)
	}

	back() {
		this.appSvc.back$.next()
	}

	newGame() {
		this.navigate([ '/game/new' ])
	}
}
