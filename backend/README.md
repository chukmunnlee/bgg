# BGG Backend

## Command line options
```
		if (!opt['port'])
			opt['port'] = parseInt(process.env.PORT) || parseInt(process.env.BGG_PORT) || 3000

		if (!opt['dbHost'])
			opt['dbHost'] = process.env.BGG_DB_HOST || 'localhost'

		if (!opt['dbPort'])
			opt['dbPort'] = parseInt(process.env.BGG_DB_PORT) || 3306

		if (!opt['dbUser'])
			opt['dbUser'] = process.env.BGG_DB_USER || 'fred'

		if (!opt['dbPassword'])
			opt['dbPassword'] = process.env.BGG_DB_PASSWORD || 'fred'

		if (!opt['version'])
			opt['version'] = process.env.BGG_VERSION || 'generic'

		if ((!opt['prefix']) && process.env.BGG_PREFIX)
			opt['prefix'] = process.env.BGG_PREFIX

		if ((!opt['cors']) && process.env.BGG_CORS)
			opt['cors'] = process.env.BGG_CORS

		if ((!opt['client']) && process.env.BGG_CLIENT)
			opt['client'] = process.env.BGG_CLIENT
```
