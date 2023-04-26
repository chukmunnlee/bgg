import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';

import { MongoClient, Sort } from 'mongodb'
import {Game} from './models';

import { env } from './utils'

@Injectable()
export class BggService implements OnApplicationBootstrap, OnApplicationShutdown{

	private client!: MongoClient

	async getGames(limit: number, offset: number): Promise<Game[]> {
		return this.client.db('bgg')
			.collection('games')
			.find()
			.skip(offset)
			.limit(limit)
			.project({ _id: 0 })
			.sort({ name: -1 })
			.toArray()
			.then(results => {
				return results.map(
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
			})
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

	onApplicationShutdown(signal?: string) {
		return this.client.close()
	}
}
