import {PrometheusOptions} from '@willsoto/nestjs-prometheus';
import {CliOptionService} from './services/cli-option.service';

export const serveStaticModule = () => 
		import('@nestjs/serve-static').then(m => {
			const cliOptSvc = new CliOptionService();
			const opt = cliOptSvc.options
			if ('client' in opt)
				return m.ServeStaticModule.forRoot({
					rootPath: opt['client'],
					serveRoot: opt['prefix'] || ''
			})
			return m.ServeStaticModule.forRoot()
		})

export const metricsModule = () =>
	import('@willsoto/nestjs-prometheus').then(m => {
		const cliOptSvc = new CliOptionService();
		const opt = cliOptSvc.options
		const config: PrometheusOptions = {
			path: '/metrics',
			defaultMetrics: { 
				enabled: true, 
				//config: {}
			}
		}
		if ('client' in opt) 
			config['path'] = `${opt['client']}/metrics`
		return m.PrometheusModule.register(config)
	})
