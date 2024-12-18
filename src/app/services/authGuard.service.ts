import { EventEmitter, inject, Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Route, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  isAuthorized = false;
 
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    if(this.isAuthorized){
      return true;
    } else {
      this.router.createUrlTree(['/auth']);
      return false;
    }
  }

  canLogin(userName: string, password: string) {
    if(userName === 'admin' && password === 'safeTesting'){
      this.isAuthorized =true;
      this.router.navigate(['home'])
    } else {
      this.isAuthorized = false;
    }
    console.log('authorized ',this.isAuthorized);
  }

}

export const isLoggedIn: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AuthGuardService).canActivate(route, state);
}
