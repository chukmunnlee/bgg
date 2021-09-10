import { Component } from '@angular/core';
import {AppService} from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor(private appSvc: AppService) { }

	back() {
		this.appSvc.back$.next()
	}
}
