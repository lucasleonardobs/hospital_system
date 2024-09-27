import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { FormControl, Validators } from '@angular/forms';
import { PatientsService } from '../patients.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { checkNumberInput } from 'src/app/utils/checkNumberInput';
import { openInfoDialog } from 'src/app/utils/infoDialogMessage';
type PriorityOptions = { label: string; value: string };

@Component({
  selector: 'patient-register-dialog',
  templateUrl: './patient-register-dialog.component.html',
  styleUrls: ['./patient-register-dialog.component.sass'],
})
export class PatientRegisterDialogComponent implements OnInit {
  public patient: any = false;
  public errors: any = {
    patientAlreadyExist: '',
    patientNotFound: '',
  };
  constructor(
    public infoDialog: MatDialog,
    public dialogRef: MatDialogRef<PatientRegisterDialogComponent>,
    private patientsService: PatientsService
  ) {}

  public errorMessage: string | undefined = '';
  public priority!: number;
  public showPatientInfo: boolean = false;
  public cpf = new FormControl('', [
    Validators.required,
    Validators.minLength(11),
    Validators.maxLength(11),
  ]);

  formatDate(date: string) {
    const formatedDate = date,
      [yyyy, mm, dd, hh, mi] = date.split(/[/:\-T]/);
    return `${dd}/${mm}/${yyyy}`;
  }

  getErrorMessage() {
    if (this.cpf.hasError('required')) {
      return 'CPF obrigatório.';
    }
    return 'Não é um CPF válido';
  }

  keyPressNumbers(event: any) {
    this.errors = {};
    checkNumberInput(event);
  }

  public priorityOptions: PriorityOptions[] = [
    { label: 'Alta', value: 'high' },
    { label: 'Média', value: 'medium' },
    { label: 'Baixa', value: 'low' },
  ];

  getPrioritySelected(event: MatSelectChange): void {
    this.priority = event.value;
  }

  async onSubmit(): Promise<any> {
    const { cpf, priority } = this;
    const priorityMap: any = {
      high: 2,
      medium: 1,
      low: 0,
    };

    try {
      await this.patientsService.addPatient({
        cpf: cpf.value,
        priority: priorityMap[priority],
      });
      openInfoDialog({
        dialogRef: this.infoDialog,
        operation: 'create',
        type: 'success',
      });
    } catch (error) {
      console.log('error', error);
    }
    this.closeDialog();
  }

  async findPatientByCpf(): Promise<any> {
    const { cpf } = this;

    let patientFound: any = '';
    let patientInWaitingList: any = '';

    try {
      await lastValueFrom(
        this.patientsService.findPatientRegisterByCpf({ cpf: cpf.value })
      ).then((result) => (patientFound = result.body));
    } catch (error) {
      this.errors.patientNotFound = '';
    }

    try {
      await lastValueFrom(
        this.patientsService.findPatientByCpf({ cpf: cpf.value })
      ).then((result) => (patientInWaitingList = result.body));
    } catch (error) {
      this.errors.patientAlreadyExist = '';
    }

    if (patientFound && patientInWaitingList) {
      this.errors.patientNotFound = '';
      this.errors.patientAlreadyExist = 'Paciente já existe';
      return (this.showPatientInfo = false);
    }

    if (!patientFound) {
      this.errors.patientAlreadyExist = '';
      this.errors.patientNotFound = 'Paciente não encontrado';
      return (this.showPatientInfo = false);
    }

    if (patientFound && !patientInWaitingList) {
      this.showPatientInfo = true;
      return (this.patient = patientFound);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
