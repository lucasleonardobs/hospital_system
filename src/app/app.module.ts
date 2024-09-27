import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule,  ReactiveFormsModule} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import {MatGridListModule} from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './patient/patient.component';
import { ReportsComponent } from './reports/reports.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './login/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { PatientRegisterDialogComponent } from './patient/patient-register-dialog/patient-register-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PatientViewDialogComponent } from './patient/patient-view-dialog/patient-view-dialog.component';
import { MedicalExamsComponent } from './medical-exams/medical-exams.component';
import { CreateMedicalExamsDialogComponent } from './medical-exams/create-medical-exams-dialog/create-medical-exams-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgApexchartsModule } from "ng-apexcharts";
import {MatStepperModule} from '@angular/material/stepper';

import { BrokerBackendService } from './broker-backend.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { DeleteMedicalExamsDialogComponent } from './medical-exams/delete-medical-exams-dialog/delete-medical-exams-dialog.component';
import { ViewMedicalExamsDialogComponent } from './medical-exams/view-medical-exams-dialog/view-medical-exams-dialog.component';
import { DeletePatientWaitingListDialogComponent } from './patient/delete-patient-waiting-list-dialog/delete-patient-waiting-list-dialog.component';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { CreatePatientDialogComponent } from './patients-list/create-patient-dialog/create-patient-dialog.component';
import { EditPatientDialogComponent } from './patients-list/edit-patient-dialog/edit-patient-dialog.component';
import { ViewPatientDialogComponent } from './patients-list/view-patient-dialog/view-patient-dialog.component';
import { DeletePatientDialogComponent } from './patients-list/delete-patient-dialog/delete-patient-dialog.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PatientComponent,
    ReportsComponent,
    LoginComponent,
    PatientRegisterDialogComponent,
    PatientViewDialogComponent,
    MedicalExamsComponent,
    CreateMedicalExamsDialogComponent,
    DeleteMedicalExamsDialogComponent,
    ViewMedicalExamsDialogComponent,
    DeletePatientWaitingListDialogComponent,
    PatientsListComponent,
    CreatePatientDialogComponent,
    EditPatientDialogComponent,
    ViewPatientDialogComponent,
    DeletePatientDialogComponent,
    InfoDialogComponent,
  ],
  entryComponents: [PatientRegisterDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    MatToolbarModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatRadioModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    NgApexchartsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    PatientRegisterDialogComponent,
    HttpClientModule,
    BrokerBackendService,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
