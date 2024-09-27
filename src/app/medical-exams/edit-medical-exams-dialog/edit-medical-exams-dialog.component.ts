import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-edit-medical-exams-dialog',
  templateUrl: './edit-medical-exams-dialog.component.html',
  styleUrls: ['./edit-medical-exams-dialog.component.sass']
})
export class EditMedicalExamsDialogComponent implements OnInit {


  public selectedExamId: string = '';
  public selectedDoctorId: string = '';
  public scheduledDate: string = '';
  public patientName: string = ''
  public patientFound: boolean = false;

  public exams: { label: string; id: string }[] = [
    {
      label: 'Raio X',
      id: '1',
    },
    {
      label: 'Tomografia',
      id: '2',
    },
    {
      label: 'Hemograma',
      id: '3',
    },
    {
      label: 'Eletrocardiograma',
      id: '4',
    },
  ];
  public doctors: { label: string; id: string }[] = [
    {
      label: 'Dr. Miguel Arraes',
      id: '1212121',
    },
    {
      label: 'Dra. Priscila Senna',
      id: '21313123',
    },
    {
      label: 'Dra. Raphaela sANTOS',
      id: '123123123',
    },
    {
      label: 'Dr. Irineu',
      id: '1231231',
    },
  ];

  public cpf: string = '';
  setSelectedExam(event: MatSelectChange): void {
    this.selectedExamId = event.value;
  }
  setSelectedDoctorId(event: MatSelectChange): void {
    this.selectedDoctorId = event.value;
  }
  ngOnInit(): void {
  }
  
  onSubmit(): void {
    const { scheduledDate, selectedExamId, patientName, selectedDoctorId} = this;
  
    const registerData = {
     patientName,
     selectedExamId,
     selectedDoctorId,
     scheduledDate
    };

  }

  constructor(
    public dialogRef: MatDialogRef<EditMedicalExamsDialogComponent> // @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

}
