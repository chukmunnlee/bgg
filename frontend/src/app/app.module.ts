import {APP_BASE_HREF} from '@angular/common';
import { ErrorHandler, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search.component';
import {BGGService} from './services/bgg.service';
import { GamesListComponent } from './components/games-list.component';
import { GameComponent } from './components/game.component';
import {AppService} from './services/app.service';
import { GameNewComponent } from './components/game-new.component';
import {FormGuardService} from './services/form-guard.service';

export const PREFIX = window.location.pathname.split('/')[1] || ''

const mkRoute = (r: string) => {
	if (PREFIX)
		return `${PREFIX}/${r}`
	return r
}

const dynamicBaseHref: Provider = {
	provide: APP_BASE_HREF,
	useValue: '/' + PREFIX
}

const errorService: Provider = {
	provide: ErrorHandler,
	useExisting: AppService
}

const routes: Routes = [
	{ path: '', component: SearchComponent },
	{ path: 'games/search', component: GamesListComponent }, 
	{ path: 'game/new', component: GameNewComponent, canDeactivate: [ FormGuardService ] },
	{ path: 'game/:gid', component: GameComponent },
	{ path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent, SearchComponent, GamesListComponent, GameComponent, GameNewComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, HttpClientModule,
	 RouterModule.forRoot(routes)
  ],
  providers: [ BGGService, AppService, FormGuardService, dynamicBaseHref, errorService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
