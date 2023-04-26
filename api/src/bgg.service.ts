import { Injectable, NotFoundException, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';

import { MongoClient } from 'mongodb'
import { Game, Comment, GameSummary } from './models';

import { env } from './utils'

@Injectable()
export class BggService implements OnApplicationBootstrap, OnApplicationShutdown{

	private client!: MongoClient

	async check(): Promise<any> {
		return this.collection('games')
			.findOne()
			.then(() => ({ timestamp: (new Date()).getTime() }))
	}

	async getGame(gameId: number): Promise<Game> {
		return this.collection('games')
			.find({ gid: gameId })
			.toArray()
			.then(results => {
				if (!results.length)
					throw new NotFoundException({ error: `${gameId} not found` })

				const r = results[0]
				return {
						gameId: r.gid,
						name: r.name,
						year: r.year,
						ranking: r.ranking,
						usersRated: r.users_rated,
						url: r.url,
						image: r.image
				}
			})
	}

	async getGamesSummary(limit: number, offset: number): Promise<GameSummary[]> {
		return this.collection('games')
			.find()
			.skip(offset)
			.limit(limit)
			.project({ _id: 0, gameId: 1, name: 1, url: 1 })
			.sort({ name: -1 })
			.toArray()
			.then(results => results.map(
					r => ({
						gameId: r.gid,
						name: r.name,
						url: r.url,
					} as GameSummary)
				)
			)
	}

	async getGames(limit: number, offset: number): Promise<Game[]> {
		return this.collection('games')
			.find()
			.skip(offset)
			.limit(limit)
			.project({ _id: 0 })
			.sort({ name: -1 })
			.toArray()
			.then(results => results.map(
					r => ({
						gameId: r.gid,
						name: r.name,
						year: r.year,
						ranking: r.ranking,
						usersRated: r.users_rated,
						url: r.url,
						image: r.image
					} as Game)
				)
			)
	}

	async findCommentsByGame(gameId: number, limit = 20): Promise<Comment[]> {
		return this.collection('comments')
			.find({ gid: gameId })
			.limit(limit)
			.toArray()
			.then(results => results.map(
					r => ({
						commentId: r.c_id,
						gameId: r.gid,
						user: r.user,
						rating: r.rating, 
						text: r.c_text
					} as Comment)
				)
			)
	}

	async findCommentsByUser(user: string, limit = 20): Promise<Comment[]> {
		return this.collection('comments')
			.find({ user: { $regex: user, $options: 'i' } })
			.limit(limit)
			.toArray()
			.then(results => results.map(
					r => ({
						commentId: r.c_id,
						gameId: r.gid,
						user: r.user,
						rating: r.rating, 
						text: r.c_text
					} as Comment)
				)
			)
	}

	onApplicationBootstrap(): Promise<void> {
		const url = env('MONGO_URL', 'mongodb://localhost:27017/bgg')
		return new Promise((resolve, reject) => {
			try {
				this.client = new MongoClient(url)
				this.client.connect()
					.then(m => {
						console.info(`Connected to Mongo: ${url}`)
						resolve()
					})
			} catch(error) {
				reject(error)
			}
		})
	}

	collection(c: string) {
		return this.client.db('bgg')
			.collection(c)
	}

	onApplicationShutdown(signal?: string) {
		return this.client.close()
	}
}
