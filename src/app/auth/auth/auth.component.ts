import { Component, ChangeDetectionStrategy, signal, OnInit, EventEmitter } from '@angular/core';
import { AuthGuardService } from 'src/app/services/authGuard.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {

  loggedIn = new EventEmitter<boolean>(false);
  userName!: string;
  password!: string;

  constructor(private authGuardService : AuthGuardService){

  }

  ngOnInit(): void {
    this.userName = '';
    this.password = '';
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }


  onClick(): void{
    this.authGuardService.canLogin(this.userName, this.password);
  }


}
