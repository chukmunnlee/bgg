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

export interface Comment {
	cid: string
	gid: number
	user: string
	rating: number
	comment: string
}
