import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
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
import { checkAlphaInput } from 'src/app/utils/checkAlphaInput';
import { checkNumberInput } from 'src/app/utils/checkNumberInput';
import { PatientsListService } from '../patients-list.service';
import { Patient } from '../../../types';
import { openInfoDialog } from 'src/app/utils/infoDialogMessage';

@Component({
  selector: 'app-edit-patient-dialog',
  templateUrl: './edit-patient-dialog.component.html',
  styleUrls: ['./edit-patient-dialog.component.sass'],
})
export class EditPatientDialogComponent implements OnInit {
  constructor(
    private patientsService: PatientsListService,
    public infoDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Patient,
    public dialogRef: MatDialogRef<EditPatientDialogComponent>
  ) {}

  form!: FormGroup;
  public checkAlphaInput = checkAlphaInput;
  public checkNumberInput = checkNumberInput;

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls!;
  }

  validateField(attr: string) {
    return this.f?.[attr]?.invalid;
  }

  public name = this.data.name;
  public cpf = this.data.cpf;
  public cep = this.data.cep;
  public gender = this.data.gender;
  public address = this.data.address;
  public date_of_birth = this.data.date_of_birth;
  public phone_number = this.data.phone_number;
  public selectedSex = '';
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

  setGender(event: MatSelectChange): void {
    this.gender = event.value;
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      return;
    }
    const {
      name,
      cpf,
      cep,
      address,
      date_of_birth,
      selectedSex,
      phone_number,
    } = this;

    const patient = {
      name,
      address,
      date_of_birth,
      cep,
      gender: selectedSex || this.gender,
      phone_number,
    };

    try {
      await this.patientsService.editPatient(cpf, patient);
      openInfoDialog({
        dialogRef: this.infoDialog,
        operation: 'edit',
        type: 'success',
      });
    } catch (err) {
      console.log('Erro ao editar paciente', err);
    }

    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.data.name, Validators.required),
      address: new FormControl(this.data.address, Validators.required),
      cep: new FormControl(this.data.cep, Validators.required),
      date_of_birth: new FormControl(
        this.data.date_of_birth,
        Validators.required
      ),
      phone_number: new FormControl(
        this.data.phone_number,
        Validators.required
      ),
      gender: new FormControl(this.data.gender, Validators.required),
    });
  }
}
