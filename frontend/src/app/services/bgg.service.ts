import {APP_BASE_HREF} from "@angular/common";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {GameSummary} from "common/models/entity";

import { GetGame, GetGames } from 'common/models/response'

@Injectable()
export class BGGService {
	baseHref = ''
	constructor(private http: HttpClient
			, @Inject(APP_BASE_HREF) readonly baseHrefSvc: string) { 
		if ('/' != this.baseHrefSvc)
			this.baseHref = this.baseHrefSvc
	}

	selectGamesByName(q: string, limit = 20, offset = 0): Promise<GetGame[]> {
		const params = new HttpParams()
			.set('q', q)
			.set('limit', limit)
			.set('offset', offset)
		return this.http.get<GetGames>(`${this.baseHref}/games/search`, { params })
			.toPromise()
			.then(result => result.games)
	}
}
