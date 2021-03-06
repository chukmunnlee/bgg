import {APP_BASE_HREF} from "@angular/common";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {Game, GameSummary} from "common/models/entity";

import { GetGame, GetGameByGid, GetGames, InsertGame } from 'common/models/response'

@Injectable()
export class BGGService {
	baseHref = ''
	constructor(private http: HttpClient
			, @Inject(APP_BASE_HREF) readonly baseHrefSvc: string) { 
		if ('/' != this.baseHrefSvc)
			this.baseHref = this.baseHrefSvc
	}

	selectGamesByName(q: string, limit = 20, offset = 0): Promise<GetGames> {
		const params = new HttpParams()
			.set('q', q)
			.set('limit', limit)
			.set('offset', offset)
		//@ts-ignore
		return this.http.get<GetGames>(this.mkPath('/api/games/search'), { params })
			.toPromise()
	}

	selectGameById(gid: number): Promise<GetGameByGid> {
		//@ts-ignore
		return this.http.get<GetGameByGid>(this.mkPath(`/api/game/${gid}`))
			.toPromise()
	}

	insertGame(game: Game): Promise<InsertGame> {
		//@ts-ignore
		return this.http.post<InsertGame>(this.mkPath('/api/game'), game)
			.toPromise()
	}

	private mkPath(p: string): string {
		return `${this.baseHref}${p}`
	}
}
