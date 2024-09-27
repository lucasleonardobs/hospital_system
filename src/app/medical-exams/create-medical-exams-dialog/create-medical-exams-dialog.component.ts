import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { lastValueFrom } from 'rxjs';
import { PatientsListService } from 'src/app/patients-list/patients-list.service';
import { MedicalExamsComponent } from '../medical-exams.component';
import { MedicalExamsService } from '../medical-exams.service';
import parseDate from '../../utils/parseDate';
import { openInfoDialog } from 'src/app/utils/infoDialogMessage';
@Component({
  selector: 'app-create-medical-exams-dialog',
  templateUrl: './create-medical-exams-dialog.component.html',
  styleUrls: ['./create-medical-exams-dialog.component.sass'],
})
export class CreateMedicalExamsDialogComponent implements OnInit {
  public exam: string = '';
  public doctor_name: any = false;
  public scheduled_at = '';

  public patient: any = false;
  public patientFound: boolean = false;
  public exams: { label: string; id: string }[] = [
    {
      label: 'Raio X',
      id: 'x_ray',
    },
    {
      label: 'Tomografia',
      id: 'tomography',
    },
    {
      label: 'Hemograma',
      id: 'blood_count',
    },
    {
      label: 'Eletrocardiograma',
      id: 'electrocardiogram',
    },
  ];
  public doctors: { [key: string]: { label: string; id: number }[] } = {
    x_ray: [
      {
        label: 'Dra. Tatiana Noronha',
        id: 1,
      },
      {
        label: 'Dr. Jair Malta ',
        id: 2,
      },
      {
        label: 'Dra. Celeste Bessa ',
        id: 3,
      },
    ],
    tomography: [
      {
        label: 'Dra. Gina Cedraz',
        id: 4,
      },
      {
        label: 'Dr. Marcelino Abelho',
        id: 5,
      },
      {
        label: 'Dra. Emily  Zagalo',
        id: 6,
      },
    ],
    blood_count: [
      {
        label: 'Dra. Céline Ramires ',
        id: 7,
      },
      {
        label: 'Dra. Ana Catarina ',
        id: 8,
      },
      {
        label: 'Dra. Branca Marques ',
        id: 9,
      },
    ],
    electrocardiogram: [
      {
        label: 'Taíssa Naves ',
        id: 10,
      },
      {
        label: 'Stella Remígio ',
        id: 11,
      },
      {
        label: 'Renata Lameiras',
        id: 12,
      },
    ],
  };
  public cpf = new FormControl('', [
    Validators.required,
    Validators.minLength(11),
    Validators.maxLength(11),
  ]);

  getErrorMessage() {
    if (this.cpf.hasError('required')) {
      return 'CPF obrigatório.';
    }
    return 'Não é um CPF válido';
  }

  public errors: any = {
    patientAlreadyExist: '',
    patientNotFound: '',
  };
  keyPressNumbers(event: any) {
    this.errors = {};
    var charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  public showPatientInfo: boolean = false;

  async findPatientByCpf(): Promise<any> {
    const { cpf } = this;

    let patientFound: any = '';
    let examAppointment: any = '';

    try {
      await lastValueFrom(
        this.patientsService.findPatientByCpf({ cpf: cpf.value })
      ).then((result) => (patientFound = result.body));
    } catch (error) {
      this.errors.patientNotFound = '';
    }

    try {
      await lastValueFrom(
        this.medicalExamService.findExamByPatientCpf({ cpf: cpf.value })
      ).then((result) => (examAppointment = result.body));
    } catch (error) {
      this.errors.patientAlreadyExist = '';
    }

    if (patientFound && examAppointment) {
      this.errors.patientNotFound = '';
      this.errors.patientAlreadyExist = 'Paciente com exame já marcado';
      return (this.showPatientInfo = false);
    }

    if (!patientFound) {
      this.errors.patientAlreadyExist = '';
      this.errors.patientNotFound = 'Paciente não encontrado';
      return (this.showPatientInfo = false);
    }

    if (patientFound && !examAppointment) {
      this.showPatientInfo = true;
      this.patient = patientFound;
      this.patient.date_of_birth = parseDate({
        date: this.patient?.date_of_birth,
      });
      return;
    }
  }

  async onSubmit(): Promise<void> {
    const { scheduled_at, doctor_name, exam } = this;

    const parsedExam = this.exams.find((el) => el.id === exam)?.label ?? '';

    const data = {
      cpf: this.patient.cpf,
      exam: parsedExam,
      doctor_name,
      scheduled_at,
    };
    openInfoDialog({
      dialogRef: this.infoDialog,
      operation: 'create',
      type: 'success',
    });
    await this.medicalExamService.scheduleExam(data);
    this.closeDialog()
  }

  setSelectedExam(event: MatSelectChange): void {
    this.exam = event.value;
  }
  setSelectedDoctorId(event: MatSelectChange): void {
    this.doctor_name = event.value;
  }

  constructor(
    public infoDialog: MatDialog,
    private patientsService: PatientsListService,
    private medicalExamService: MedicalExamsService,
    public dialogRef: MatDialogRef<CreateMedicalExamsDialogComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
