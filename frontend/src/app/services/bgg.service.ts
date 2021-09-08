import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {GameSummary} from "common/models/entity";

import { GetGame, GetGames } from 'common/models/response'

@Injectable()
export class BGGService {
	constructor(private http: HttpClient) { }

	selectGamesByName(q: string, limit = 20, offset = 0): Promise<GetGame[]> {
		const params = new HttpParams()
			.set('q', q)
			.set('limit', limit)
			.set('offset', offset)
		return this.http.get<GetGames>('games/search', { params })
			.toPromise()
			.then(result => result.games)
	}
}
