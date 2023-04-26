export const env = (envName: string, defaultValue = undefined) => {
	return process.env[envName] || defaultValue
}
