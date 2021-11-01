import {Provider} from '@nestjs/common';
import {makeCounterProvider, makeGaugeProvider, makeSummaryProvider, PrometheusOptions} from '@willsoto/nestjs-prometheus';
import {CliOptionService} from './services/cli-option.service';

export const METRIC_BGG_API_REQUEST = 'bgg_api_request'
export const METRIC_BGG_INFLIGHT_REQUEST = 'bgg_inflight_request'
export const METRIC_BGG_REQUEST_DURATION = 'bgg_request_duration'

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
			name: METRIC_BGG_API_REQUEST,
			help: 'Cumulative number of requests to /api/*',
			labelNames: [ 'path', 'code', 'instanceName', 'method' ]
		})
	)
	metrics.push(
		makeGaugeProvider({
			name: METRIC_BGG_INFLIGHT_REQUEST,
			help: 'Current number of request to /api/*',
			labelNames: [ 'path', 'instanceName', 'method' ]
		})
	)
	metrics.push(
		makeSummaryProvider({
			name: METRIC_BGG_REQUEST_DURATION,
			help: 'Duration of request response',
			labelNames: [ 'path', 'instanceName', 'method' ]
		})
	)
	return metrics
}
