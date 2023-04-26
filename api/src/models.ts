export interface GameSummary {
	gameId: number
	name: string
	url: string
}

export interface Game {
	gameId: number
	name: string
	year: number
	ranking: number
	usersRated: number
	url: string
	image: string
}

export interface Comment {
	commentId: string
	gameId: number
	user: string
	rating: number
	text: string
}

export interface Version {
	version: string
}
