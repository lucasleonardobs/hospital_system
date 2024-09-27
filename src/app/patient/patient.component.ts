import { Component, OnInit, Inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PatientRegisterDialogComponent } from './patient-register-dialog/patient-register-dialog.component';
import { PatientViewDialogComponent } from './patient-view-dialog/patient-view-dialog.component';
import { PatientsService } from './patients.service';
import { DeletePatientWaitingListDialogComponent } from './delete-patient-waiting-list-dialog/delete-patient-waiting-list-dialog.component';
import { lastValueFrom } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { checkNumberInput } from '../utils/checkNumberInput';
import { cpfMask } from '../utils/cpfMask';

export type WaitingListPatient = {
  id: string;
  patient_cpf: string;
  attended: boolean;
  priority: number;
  created_at: Date;
  patient: {
    name: string;
    date_of_birth: Date;
    phone_number: string;
    cep: string;
    address: string;
    gender: 'male' | 'female' | 'others';
  };
};
export interface Response {
  body: WaitingListPatient;
}
export interface PeriodicElement {
  name: string;
  cpf: string;
  priority: 'low' | 'medium' | 'high';
  isServed: boolean;
}
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-patients',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.sass'],
})
export class PatientComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'cpf',
    'name',
    'priority',
    'served',
    'actions',
  ];
  public cpfMask = cpfMask;
  searchError: string = '';
  public color: any = '';
  public isServed: boolean = false;
  public dataSource: WaitingListPatient | any = [];
  public patientFound: any = '';
  public checkNumberInput = checkNumberInput 
  public loading: boolean = true;

  cleanSearch(): void {
    this.searchByCpf = '';
    this.searchError = '';
    this.refreshData();
    this.patientFound = false;
  }

  keyPressNumbers(event: any) {
    this.searchError = '';
    var charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  public searchByCpf: string = '';

  async searchPatientByCpf(): Promise<any> {
    if (this.searchByCpf.length === 0 || this.searchByCpf.length < 11)
      return (this.searchError = 'Digite um Cpf válido');

    try {
      await lastValueFrom(
        this.patientsService.findPatientByCpf({ cpf: this.searchByCpf })
      ).then((result) => {
        this.patientFound = result.body;
        return (this.dataSource = [result.body]);
      });
    } catch (err) {
      return (this.searchError = 'Paciente não encontrado, tente outro Cpf...');
    }
  }
  setPatientAttended(cpf: string) {
    this.patientsService.setPatientAttended(cpf).subscribe(
      (data: any) => {
        this.refreshData();
      },
      (err: any) => console.log('Erro ao setar o paciente como atendido', err)
    );
  }

  setPriority(event: any): void {
    console.log("dataSource", this.dataSource)
    console.log("dataSource", this.dataSource.length === 0)
    this.searchByCpf = '';
    const priority = Number(event.value);
    this.patientsService.findAllPatients({ filter: priority }).subscribe(
      (data: Response) => (this.dataSource = data.body),
      (err: any) => console.log('Erro ao listar os pacientes', err)
    );
  }
  public patients: any = [];
  constructor(
    public matDialog: MatDialog,
    private patientsService: PatientsService
  ) {}

  openCreatePatientDialog(): void {
    const dialogRef = this.matDialog.open(PatientRegisterDialogComponent, {
      width: '600px',
      maxHeight: '500px',
    });
    dialogRef.afterClosed().subscribe(() => this.refreshData());
  }

  openDeletePatientDialog(cpf: string): void {
    const dialogRef = this.matDialog.open(
      DeletePatientWaitingListDialogComponent,
      {
        data: {
          cpf,
        },
        width: '350px',
        height: '160px',
      }
    );
    dialogRef.afterClosed().subscribe(() => this.refreshData());
  }

  openViewPatientDialog(data: WaitingListPatient): void {
    this.matDialog.open(PatientViewDialogComponent, {
      width: '600px',
      maxHeight: '550px',
      data,
    });
  }

  async refreshData(): Promise<any> {
    
    try {
      await lastValueFrom(this.patientsService.findAllPatients({})).then(
        (result) => {
          this.dataSource = result.body;
        }
        );
        this.loading = false;
    } catch (err) {
      console.log('Erro ao listar os pacientes', err);
    }
  }

  ngOnInit(): void {
    this.refreshData();
  }
}
