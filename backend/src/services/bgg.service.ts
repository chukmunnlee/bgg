import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { createPool, Pool } from 'mysql2/promise'
import { ResultSetHeader } from 'mysql2'
import {Game, GameSummary, Comment, CommentSummary} from 'common/models/entity';
import {
	SELECT_GAME_BY_GID, SELECT_GAME_COUNT, SELECT_GAME_SUMMARY, SELECT_GAME_BY_NAME,
	SELECT_COMMENTS_BY_GID_COUNT, SELECT_COMMENTS_BY_CID, SELECT_COMMENTS_SUMMARY_BY_GID,
	SELECT_GAME_COUNT_BY_NAME,
	INSERT_GAME
} from '../sql';
import {CliOptionService} from './cli-option.service';

@Injectable()
export class BggService implements OnApplicationBootstrap, OnApplicationShutdown {

	private pool: Pool

	constructor(private cliOptSvc: CliOptionService) { }

	async ping(): Promise<void> {
		const conn = await this.pool.getConnection()
		return conn.ping()
			.then(() => {
				conn.release()
			})
	}

	async selectGamesByName(q: string, limit = 20, offset = 0): Promise<GameSummary[]> {
		const conn = await this.pool.getConnection()
		return conn.query(SELECT_GAME_BY_NAME, [ `%${q}%`, limit, offset ])
			.then(result => {
				conn.release()
				return result[0] as GameSummary[]
			})
	}

	async selectGameSummary(limit = 20, offset = 0): Promise<GameSummary[]> {
		const conn = await this.pool.getConnection()
		return conn.query(SELECT_GAME_SUMMARY, [ limit, offset ])
			.then(result => {
				conn.release()
				return result[0] as GameSummary[]
			})
	}

	async selectGameByGid(gid: number): Promise<Game> {
		const conn = await this.pool.getConnection()
		return conn.query(SELECT_GAME_BY_GID, [ gid ])
			.then(result => {
				conn.release()
				//@ts-ignore
				if (!result[0].length)
					return null
				const r: any = result[0][0]
				return {
					gid: r.gid,
					name: r.name,
					year: r.year,
					ranking: r.ranking || -1,
					usersRated: r.users_rated || 0,
					url: r.url || '',
					image: r.image || ''
				} as Game
			})
	}

	async seletGamesCountByName(q: string): Promise<number> {
		const conn = await this.pool.getConnection()
		return conn.query(SELECT_GAME_COUNT_BY_NAME, [`%${q}%`])
			.then(result => {
				conn.release()
				//@ts-ignore
				if (!result[0].length)
					return 0
				return result[0][0].game_cnt
			})
	}

	async seletGamesCount(): Promise<number> {
		const conn = await this.pool.getConnection()
		return conn.query(SELECT_GAME_COUNT)
			.then(result => {
				conn.release()
				return result[0][0].game_cnt
			})
	}

	async selectCommentSummaryByGid(gid: number, limit = 20, offset = 0): Promise<CommentSummary[]> {
		const conn = await this.pool.getConnection()
		return conn.query(SELECT_COMMENTS_SUMMARY_BY_GID, [ gid, limit, offset ])
			.then(result => {
				conn.release()
				//@ts-ignore
				return result[0].map(
					(r: any) => ({
						cid: r.c_id,
						gid: r.gid,
						user: r.user,
					}) as CommentSummary
				)
			})
	}

	async selectCommentByCid(cid: string): Promise<Comment> {
		const conn = await this.pool.getConnection()
		return conn.query(SELECT_COMMENTS_BY_CID, [ cid ])
			.then(result => {
				//@ts-ignore
				if (!result[0].length)
					return null
				const r: any = result[0][0]
				return {
					cid: r.c_id,
					gid: r.gid,
					user: r.user,
					rating: r.rating,
					comment: r.c_text
				} as Comment
			})
	}

	async selectCommentByGidCount(gid: number): Promise<number> {
		const conn = await this.pool.getConnection()
		return conn.query(SELECT_COMMENTS_BY_GID_COUNT, [ gid ])
			.then(result => {
				conn.release()
				return result[0][0].comment_cnt
			})
	}

	async insertGame(game: Game): Promise<number> {
		const conn = await this.pool.getConnection()
		const params = [ game.name, game.year, 
				game.ranking || -1, game.usersRated || 0,
				game.url, game.image || 'assets/placeholder.png'
		]
		return conn.query(INSERT_GAME, params)
			.then(result => {
				conn.release()
				return (result[0] as ResultSetHeader).insertId
			})
	}

	onApplicationBootstrap() {
		if (!!this.pool)
			return

		const opt: any = this.cliOptSvc.options;
		this.pool = createPool({
			host: opt['dbHost'],
			port: opt['dbPort'],
			user: opt['dbUser'],
			password: opt['dbPassword'],
			database: 'bgg',
			connectionLimit: 4
		})
	}

	onApplicationShutdown(sig: string): Promise<void> {
		return this.pool.end()
	}
}
