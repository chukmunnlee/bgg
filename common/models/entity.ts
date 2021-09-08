export interface GameSummary {
	gid: number
	name: string
}

export interface Game extends GameSummary {
	year: number
	ranking: number
	usersRated: number
	url: string
	image: string
}

export interface CommentSummary {
	cid: string
	gid: number
	user: string
}

export interface Comment extends CommentSummary {
	rating: number
	comment: string
}
