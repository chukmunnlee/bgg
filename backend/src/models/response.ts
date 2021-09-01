import {Game, Comment} from "./entity";

export interface GetGames {
	games: { name: string; url: string }[]
	offset: number
	limit: number
	total: number
}

export interface GetNumberOfGames {
	total: number
}

export interface GetGameById extends Game { }

export interface GetCommentsByGid {
	comments: Comment[]
	offset: number
	limit: number
	total: number
}
