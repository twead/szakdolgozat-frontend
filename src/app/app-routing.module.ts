import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { RegistrationComponent } from './auth/registration.component';
import { IndexComponent } from './index/index.component';
import { ProdGuardService as guard } from './guard/user-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { GeneralPractitionerListComponent } from './general-practitioner/general-practitioner-list.component';



const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [guard], data: {expectedRole: ['user','practitioner','admin']}},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'practitioners', component: GeneralPractitionerListComponent, canActivate: [guard], data: {expectedRole: ['admin']}},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
