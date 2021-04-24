import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxPaginationModule } from 'ngx-pagination';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login.component';
import { RegistrationComponent } from './auth/registration.component';
import { IndexComponent } from './index/index.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PatientDetailsComponent } from './admin-dashboard/patient-list/patient-details.component';
import { PatientListComponent } from './admin-dashboard/patient-list/patient-list.component';
import { PatientUpdateComponent } from './admin-dashboard/patient-list/patient-update.component';
import { GeneralPractitionerDetailsComponent } from './admin-dashboard/practitioner-list/general-practitioner-details.component';
import { GeneralPractitionerListComponent } from './admin-dashboard/practitioner-list/general-practitioner-list.component';
import { GeneralPractitionerUpdateComponent } from './admin-dashboard/practitioner-list/general-practitioner-update.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { SelectPractitionerComponent } from './appointment/select-practitioner.component';
import { UpdatePractitionerComponent } from './appointment/update-practitioner.component';
import { WorktimeComponent } from './appointment/worktime/worktime.component';
import { interceptorProvider } from './interceptor/user-interceptor.service';
import { PasswordUpdateComponent } from './profile/password-update.component';
import { ProfileUpdateComponent } from './profile/profile-update.component';
import { ProfileComponent } from './profile/profile.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ActivationComponent } from './activation/activation.component';
import { CommonQuestionsComponent } from './common-questions/common-questions.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
])

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    IndexComponent,
    MainNavComponent,
    ProfileComponent,
    GeneralPractitionerListComponent,
    GeneralPractitionerDetailsComponent,
    GeneralPractitionerUpdateComponent,
    ProfileUpdateComponent,
    PasswordUpdateComponent,
    SelectPractitionerComponent,
    PatientListComponent,
    PatientDetailsComponent,
    PatientUpdateComponent,
    AppointmentComponent,
    UpdatePractitionerComponent,
    WorktimeComponent,
    ClientListComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ActivationComponent,
    CommonQuestionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatSlideToggleModule,
    LayoutModule,
    MatSidenavModule,
    MatTableModule,
    NgxPaginationModule,
    FullCalendarModule,
    MatExpansionModule
  ],
  providers: [
    interceptorProvider,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: MAT_DATE_LOCALE, useValue: 'hu'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
