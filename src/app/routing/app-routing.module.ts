import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthComponent } from '../auth/auth/auth.component';
import { ZikirComponent } from '../zikir/zikir-detail/zikir.component';
import { isLoggedIn } from '../services/authGuard.service';
import { ZikirListComponent } from '../zikir/zikir-list/zikir-list.component';
import { WrongUrlComponent } from '../wrong-url/wrong-url.component';
import { ZikirAddComponent } from '../zikir/zikir-add/zikir-add.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/uknown',
    // redirectTo: '/zikirs',
    pathMatch: 'full',
  },
  {
    path:'auth',
    component:AuthComponent
    // component:ZikirListComponent
  },
  {
    path:'zikirs',
    component:ZikirListComponent, canActivate:[isLoggedIn]
  },
  {
    path:'zikirs/add', component: ZikirAddComponent, canActivate:[isLoggedIn]
  }
  ,
  {
    path:'zikirs/:id',
    component:ZikirComponent, canActivate:[isLoggedIn]
  },
  {
    path: '**', // Wildcard route for unknown URLs
    redirectTo: '/uknown', // Redirect to the default path (auth)
  },
  {
    path:'uknown',
    component:WrongUrlComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
