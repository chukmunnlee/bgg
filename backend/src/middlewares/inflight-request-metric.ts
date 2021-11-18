import {Injectable, NestMiddleware} from "@nestjs/common";
import { Request, Response, NextFunction } from 'express'

import {InjectMetric} from '@willsoto/nestjs-prometheus';
import { Gauge, Summary } from 'prom-client'

import {CliOptionService} from "src/services/cli-option.service";
import {METRIC_BGG_INFLIGHT_REQUEST, METRIC_BGG_REQUEST_DURATION} from 'src/utils';

@Injectable()
export class InflightRequestMetricMiddleware implements NestMiddleware {

	constructor(private cliOpt: CliOptionService,
		@InjectMetric(METRIC_BGG_INFLIGHT_REQUEST) private metricInflighReq: Gauge<string>,
		@InjectMetric(METRIC_BGG_REQUEST_DURATION) private metricReqDuration: Summary<string>) { 
	}

	use(req: Request, res: Response, next: NextFunction) {
		const labels = { 
			instanceName: this.cliOpt.options['name'],
			path: req.path,
			method: 'GET',
		}

		const end = this.metricReqDuration.startTimer(labels)

		req.on('close', () => {
			this.metricInflighReq.dec(labels)
			end(labels)
		})
		this.metricInflighReq.inc(labels)

		next()
	}
}
