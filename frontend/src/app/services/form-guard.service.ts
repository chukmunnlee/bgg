import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

export interface CanLeaveForm {
	canDeactivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
}

@Injectable()
export class FormGuardService implements CanDeactivate<CanLeaveForm> {

	canDeactivate(comp: CanLeaveForm, currRoute: ActivatedRouteSnapshot
			, currState: RouterStateSnapshot) {
		return comp.canDeactivate();
	}
}
