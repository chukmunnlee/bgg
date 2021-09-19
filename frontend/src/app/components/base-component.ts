import {Directive, OnDestroy } from "@angular/core";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {PREFIX} from "../app.module";
import {AppService} from "../services/app.service";

@Directive()
export class BaseComponent implements OnDestroy {

	sub$!: Subscription;

	constructor(public appSvc: AppService, public router: Router) { 
	}

	home(): Promise<boolean> {
		return this.router.navigate(this.mkPath(['/']))
	}

	navigate(routes: string[], params = {}): Promise<boolean> {
		return this.router.navigate(this.mkPath(routes), params)
	}

	ngOnDestroy() {
		if (this.sub$)
			this.sub$.unsubscribe()
	}

	private mkPath(r: string[]): string[] {
		if (PREFIX)
			return [ PREFIX, ...r ]
		return r
	}
}
