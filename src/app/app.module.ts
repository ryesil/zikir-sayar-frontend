import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { ZikirComponent } from './zikir/zikir-detail/zikir.component';
import { AuthComponent } from './auth/auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZikirListComponent } from './zikir/zikir-list/zikir-list.component';
import { WrongUrlComponent } from './wrong-url/wrong-url.component';
import { ConfirmDialogComponent } from '../modals/confirm-dialog/confirm-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { ResponsiveGridDirective } from './directives/responsive-grid.directive';
import { ZikirAddComponent } from './zikir/zikir-add/zikir-add.component'; // Import this module

@NgModule({
  declarations: [
    AppComponent,
    ZikirComponent,
    AuthComponent,
    ZikirListComponent,
    WrongUrlComponent,
    ConfirmDialogComponent,
    ResponsiveGridDirective,
    ZikirAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
