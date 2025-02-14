import { Component } from '@angular/core';
import { AuthGuardService } from '../services/authGuard.service';
import { Route, Router } from '@angular/router';
import { ZikirService } from '../services/zikir.service';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-wrong-url',
  templateUrl: './wrong-url.component.html',
  styleUrls: ['./wrong-url.component.scss']
})
export class WrongUrlComponent {

  constructor(private authGuardService:AuthGuardService, private userService: UserService, private router: Router){
    
  }

  onLogout(){
this.userService.logout();
  }

  onGoback(){
   const lastURL =  this.authGuardService.lastURL();
   if(lastURL) {
    this.router.navigate([lastURL])
   } else {
    this.router.navigate(['/auth']);
   }
  }

}
