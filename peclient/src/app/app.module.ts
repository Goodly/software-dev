import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { SignupComponent } from './signup/signup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MenuComponent } from './menu/menu.component';
import { UtilitiesComponent } from './utilities/utilities.component';
import { ReplaceLineBreaksPipe } from './replace-line-breaks.pipe';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'utilities', component: UtilitiesComponent },
  { path: 'logout', redirectTo: '/logout', pathMatch: 'full'},
  { path: '', redirectTo: '/logout', pathMatch: 'full' },  
  { path: '**', redirectTo: '/logout'},
  // { path: 'forgot', component: ForgotComponent },
  // { path: 'signup', component: SignupComponent },
  // { path: '**', component: PageNotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ForgotComponent,
    SignupComponent,
    PageNotFoundComponent,
    MenuComponent,
    UtilitiesComponent,
    ReplaceLineBreaksPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
