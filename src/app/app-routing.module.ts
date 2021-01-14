import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { RegistrationComponent } from './auth/registration.component';
import { IndexComponent } from './index/index.component';
import { ProdGuardService as guard } from './guard/user-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { GeneralPractitionerListComponent } from './general-practitioner/general-practitioner-list.component';
import { GeneralPractitionerDetailsComponent } from './general-practitioner/general-practitioner-details.component';
import { GeneralPractitionerUpdateComponent } from './general-practitioner/general-practitioner-update.component';
import { ProfileUpdateComponent } from './profile/profile-update.component';
import { PasswordUpdateComponent } from './profile/password-update.component';
import { SelectPractitionerComponent } from './appointment/select-practitioner.component';



const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [guard], data: {expectedRole: ['user','practitioner','admin']}},
  {path: 'profile-update', component: ProfileUpdateComponent, canActivate: [guard], data: {expectedRole: ['user','practitioner','admin']}},
  {path: 'password-update', component: PasswordUpdateComponent, canActivate: [guard], data: {expectedRole: ['user','practitioner','admin']}},
  {path: 'select-practitioner', component: SelectPractitionerComponent, canActivate: [guard], data: {expectedRole: ['user','practitioner','admin']}},
  {path: 'practitioners', component: GeneralPractitionerListComponent, canActivate: [guard], data: {expectedRole: ['admin']}},
  {path: 'details/:id', component: GeneralPractitionerDetailsComponent, canActivate: [guard], data: {expectedRole: ['admin']}},
  {path: 'update/:id', component: GeneralPractitionerUpdateComponent, canActivate: [guard], data: {expectedRole: ['admin']}},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
