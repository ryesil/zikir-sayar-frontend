import { Component, ChangeDetectionStrategy, signal, EventEmitter } from '@angular/core';
import { AuthGuardService } from 'src/app/services/authGuard.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AuthComponent {

  loggedIn = new EventEmitter<boolean>(false);
  userName = '';
  password = '';
  hide = signal(true);

  constructor(private authGuardService : AuthGuardService){

  }
  
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }


  onClick(): void{
    this.authGuardService.login(this.userName, this.password);
  }


}
