import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {Observable, tap} from "rxjs";
import { Request } from 'express'

// Singleton
let interceptor: TracingInterceptor = null;

export const createInterceptor = (name: string): TracingInterceptor => {
	if (!interceptor)
		interceptor = new TracingInterceptor(name)
	return interceptor
}

@Injectable()
export class TracingInterceptor implements NestInterceptor {

	constructor(private name: string) { }

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const host = context.switchToHttp()
		const req = host.getRequest<Request>()
		return next.handle()
			.pipe(
				tap(()=> {
					console.info('after request')
				}
			))
	}
}
