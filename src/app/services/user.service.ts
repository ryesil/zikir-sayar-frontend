import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, UserTypes } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //this is the way components gets the user.
  userObs = new BehaviorSubject<User>(new User());
  
  //TODO: Move logout logic to an interceptor to check for appwide logout
  constructor(private router: Router) {
    this.restoreUser();
   }

     // Restore user from sessionStorage
     //should we restore a dummy user to sessionStorage if the user is not valid ? yes for now
  private restoreUser(): void {
    try{
      const user = User.fromStorage();
      if (user && !user.isExpired()) {
        this.userObs.next(user);
      } else {
        this.userObs.next(new User());
        this.router.navigate(['/auth']);  // Redirect to login if session expired
      }
    } catch(error) {
      console.log('Error restoring user '+ error);
      this.userObs.next(new User());
    }
  }

  extendSession(): void {
    this.restoreUser();
    const user = this.userObs.getValue();
    if (user) {
      user.setExpiresAt();
      this.saveToSession(user);
    }
  }

  isExpired(): boolean {
    this.restoreUser();
    const user = this.userObs.getValue();
    return user ? user.isExpired() : true;
  }

  //What about existing user
  newUser(name:string,userType: UserTypes): void{
    const user = new User(name, userType);
    this.saveToSession(user);
  }

  private saveToSession(user: User): void {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.restoreUser();
}


logout(){
  this.userObs.next(new User());
  sessionStorage.clear();
  this.router.navigate(['/auth']);
}

updateUser(user: User) {
  this.saveToSession(user);
}

}
