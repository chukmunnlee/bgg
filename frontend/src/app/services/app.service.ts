import {ErrorHandler, Injectable, NgZone} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export class AppService implements ErrorHandler {
	back$ = new Subject<void>()

	constructor(private zone: NgZone) { }

	handleError(error: Error) {
		this.zone.run(() => {
			window.alert(error.message || 'Application error')
		})
	}
}
