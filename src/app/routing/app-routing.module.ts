import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthComponent } from '../auth/auth/auth.component';
import { ZikirComponent } from '../zikir/zikir/zikir.component';
import { isLoggedIn } from '../services/authGuard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
  {
    path:'auth',
    component:AuthComponent
  },
  {
    path:'home',
    component:AppComponent,
    canActivate:[isLoggedIn]
  },
  {
    path:'zikirs',
    component:ZikirComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
