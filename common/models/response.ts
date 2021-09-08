import {Game, Comment } from "./entity";

export interface GetGame {
	name: string
	url: string
}

export interface GetGames {
	games: GetGame[],
	offset: number
	limit: number
	total: number
}

export interface GetNumberOfGames {
	total: number
}

export interface GetGameByGid extends Game { }

export interface GetCommentsByGid {
	gid: number
	comments: { user: string, url: string }[]
	offset: number
	limit: number
	total: number
}

export interface GetNumberofCommentsByGid {
	gid: number
	total: number
}

export interface GetCommentByCid extends Comment { }
