import {APP_BASE_HREF} from '@angular/common';
import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search.component';
import {BGGService} from './services/bgg.service';
import { GamesListComponent } from './components/games-list.component';

const dynamicBaseHref: Provider = {
	provide: APP_BASE_HREF,
	useValue: '/' + (window.location.pathname.split('/')[1] || '')
}

const routes: Routes = [
	{ path: '', component: SearchComponent },
	{ path: 'games/search', component: GamesListComponent }, 
	{ path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent, SearchComponent, GamesListComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, HttpClientModule,
	 RouterModule.forRoot(routes)
  ],
  providers: [ dynamicBaseHref, BGGService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
