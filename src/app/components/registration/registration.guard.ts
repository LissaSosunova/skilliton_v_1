import { Injectable } from '@angular/core';
import { CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { RegistrationComponent } from './registration.component';
import { LeavePopupComponent } from './leave-popup/leave-popup.component';

@Injectable({
  providedIn: 'root'
})

export class RegistrationGuard implements CanActivate, CanActivateChild, CanLoad, CanDeactivate<RegistrationComponent> {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  canDeactivate(component: RegistrationComponent): Observable<boolean> | boolean {
    if (component.openConfirmPopup) {
      return component.leaveRegistrationPopup.onOpen();
    } else {
    return true;
  }
}
}


