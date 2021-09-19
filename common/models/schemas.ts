
export const PostGameSchema = {
	type: "object",
	properties: {
		gid: { type: "integer" },
		name: { type: "string" },
		year: { type: "integer" },
		ranking: { type: "integer" },
		usersRated: { type: "integer" },
		url: { type: "string" },
		image: { type: "string", nullable: true },
	},
	required: [ "name", "year", "url" ],
	//additionalProperties: false
}
