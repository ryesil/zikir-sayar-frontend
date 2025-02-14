import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { User, UserTypes } from '../interfaces/user';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  private lastAttemptedURL = '';


  constructor(private router: Router, private userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    //Do we need to initialize a user?
    if((!this.userService.isExpired())){
      this.lastAttemptedURL = state.url;
      return true;
    } else {
      this.router.navigateByUrl('/auth');
      return false;
    }
  }

  //Test different scenarios.
  login(userName: string, password: string): boolean {
    if(this.validateCredentials(userName, password)){
      if(password === 'ArapFaik'){
        this.userService.newUser(userName, UserTypes.ADMIN); 
      } else {
        this.userService.newUser(userName, UserTypes.USER); 
      }
      this.router.navigateByUrl('/zikirs');
      return true;
    } else {
      return false;
    }
  }


private validateCredentials(userName: string, password: string): boolean {
  if(password === 'safeTesting' || password === 'ArapFaik'){
    return true;
  } else {
    return false;
  }
}


lastURL(){
  return this.lastAttemptedURL;
}

}
export const isLoggedIn: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AuthGuardService).canActivate(route, state);
}
