import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { PatientsListService } from '../patients-list.service';
import { checkAlphaInput } from '../../utils/checkAlphaInput';
import { checkNumberInput } from '../../utils/checkNumberInput';
import { InfoDialogComponent } from 'src/app/info-dialog/info-dialog.component';
import { openInfoDialog } from '../../utils/infoDialogMessage';

@Component({
  selector: 'app-create-patient-dialog',
  templateUrl: './create-patient-dialog.component.html',
  styleUrls: ['./create-patient-dialog.component.sass'],
})
export class CreatePatientDialogComponent implements OnInit {
  public gender = '';
  public genders: { label: string; id: string }[] = [
    {
      label: 'Masculino',
      id: 'male',
    },
    {
      label: 'Feminino',
      id: 'female',
    },
    {
      label: 'Outros',
      id: 'other',
    },
  ];
  public checkAlphaInput = checkAlphaInput;
  public checkNumberInput = checkNumberInput;

  form!: FormGroup;
  submitted: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private patientsService: PatientsListService,
    public infoDialog: MatDialog,
    public dialogRef: MatDialogRef<CreatePatientDialogComponent> // @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  setGender(event: MatSelectChange): void {
    this.gender = event.value;
  }

  validateField(attr: string) {
    return this.f?.[attr]?.invalid;
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      return;
    }

    const { name, cpf, address, cep, phone_number, date_of_birth, gender } =
      this.form.value;
    const patientData = {
      name,
      cpf,
      address,
      date_of_birth,
      cep,
      gender,
      phone_number,
    };

    try {
      await this.patientsService.addPatient(patientData);
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

  closeDialog(): void {
    this.dialogRef.close();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls!;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      cep: new FormControl('', Validators.required),
      date_of_birth: new FormControl('', Validators.required),
      phone_number: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
    });
  }
}
