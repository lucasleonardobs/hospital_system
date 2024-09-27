import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PatientComponent } from './patient/patient.component';
import { MedicalExamsComponent } from './medical-exams/medical-exams.component';
import { ReportsComponent } from './reports/reports.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import {PatientsListComponent} from './patients-list/patients-list.component'

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'waiting-list',
    component: PatientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'patients-list',
    component: PatientsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'medical-exams',
    component: MedicalExamsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
