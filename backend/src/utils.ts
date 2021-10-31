import {Provider} from '@nestjs/common';
import {makeCounterProvider, PrometheusOptions} from '@willsoto/nestjs-prometheus';
import {CliOptionService} from './services/cli-option.service';

export const METRIC_API_INVOCATIONS = 'api_invocations'

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
			defaultMetrics: { enabled: true }
		}
		if ('client' in opt) 
			config['path'] = `${opt['client']}/metrics`
		return m.PrometheusModule.register(config)
	})

export const mkMetrics = (): Provider<any>[] => {
	const metrics: Provider<any>[] = []
	metrics.push(
		makeCounterProvider({
			name: METRIC_API_INVOCATIONS,
			help: 'Request to /api/*',
			labelNames: [ 'path', 'code', 'instanceName', 'method' ]
		})
	)
	console.info('>>> mkMetrics: ', metrics)
	return metrics
}
