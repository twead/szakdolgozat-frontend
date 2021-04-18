import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { RegistrationComponent } from './auth/registration.component';
import { IndexComponent } from './index/index.component';
import { ProdGuardService } from './guard/user-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { ProfileUpdateComponent } from './profile/profile-update.component';
import { PasswordUpdateComponent } from './profile/password-update.component';
import { SelectPractitionerComponent } from './appointment/select-practitioner.component';
import { LoginGuard } from './guard/login.guard';
import { WorktimeComponent } from './appointment/worktime/worktime.component';
import { PatientDetailsComponent } from './admin-dashboard/patient-list/patient-details.component';
import { PatientListComponent } from './admin-dashboard/patient-list/patient-list.component';
import { PatientUpdateComponent } from './admin-dashboard/patient-list/patient-update.component';
import { GeneralPractitionerDetailsComponent } from './admin-dashboard/practitioner-list/general-practitioner-details.component';
import { GeneralPractitionerListComponent } from './admin-dashboard/practitioner-list/general-practitioner-list.component';
import { GeneralPractitionerUpdateComponent } from './admin-dashboard/practitioner-list/general-practitioner-update.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { UpdatePractitionerComponent } from './appointment/update-practitioner.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'registration', component: RegistrationComponent, canActivate: [LoginGuard]},
  {path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [LoginGuard]},
  {path: 'reset-password/:code', component: ResetPasswordComponent, canActivate: [LoginGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [ProdGuardService], data: {expectedRole: ['user','practitioner','admin']}},
  {path: 'profile/update', component: ProfileUpdateComponent, canActivate: [ProdGuardService], data: {expectedRole: ['user','practitioner','admin']}},
  {path: 'profile/password-update', component: PasswordUpdateComponent, canActivate: [ProdGuardService], data: {expectedRole: ['user','practitioner','admin']}},
  {path: 'appointment/reservation', component: SelectPractitionerComponent, canActivate: [ProdGuardService], data: {expectedRole: ['user','practitioner','admin']}},
  {path: 'practitioners', component: GeneralPractitionerListComponent, canActivate: [ProdGuardService], data: {expectedRole: ['practitioner','admin']}},
  {path: 'practitioner-dashboard', component: ClientListComponent, canActivate: [ProdGuardService], data: {expectedRole: ['practitioner','admin']}},
  {path: 'practitioners/details/:id', component: GeneralPractitionerDetailsComponent, canActivate: [ProdGuardService], data: {expectedRole: ['practitioner','admin']}},
  {path: 'practitioners/update/:id', component: GeneralPractitionerUpdateComponent, canActivate: [ProdGuardService], data: {expectedRole: ['practitioner','admin']}},
  {path: 'patients', component: PatientListComponent, canActivate: [ProdGuardService], data: {expectedRole: ['practitioner','admin']}},
  {path: 'patients/details/:id', component: PatientDetailsComponent, canActivate: [ProdGuardService], data: {expectedRole: ['practitioner','admin']}},
  {path: 'patients/update/:id', component: PatientUpdateComponent, canActivate: [ProdGuardService], data: {expectedRole: ['practitioner','admin']}},
  {path: 'appointment/reservation', component: AppointmentComponent, canActivate: [ProdGuardService], data: {expectedRole: ['practitioner','admin']}},
  {path: 'appointment/update-practitioner', component: UpdatePractitionerComponent, canActivate: [ProdGuardService], data: {expectedRole: ['practitioner','admin']}},
  {path: 'appointment/worktimes', component: WorktimeComponent, canActivate: [ProdGuardService], data: {expectedRole: ['practitioner','admin']}},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
