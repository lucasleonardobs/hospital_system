import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { cpfMask } from 'src/app/utils/cpfMask';
import { phoneMask } from 'src/app/utils/phoneMask';
import { MedicalExam } from 'src/types';

@Component({
  selector: 'app-view-medical-exams-dialog',
  templateUrl: './view-medical-exams-dialog.component.html',
  styleUrls: ['./view-medical-exams-dialog.component.sass'],
})
export class ViewMedicalExamsDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: MedicalExam) {}
  public cpfMask = cpfMask
  public phoneMask = phoneMask
  formatDate({ date, showTime }: { date: string; showTime?: boolean }) {
    const formatedDate = date,
      [yyyy, mm, dd, hh, mi] = date.split(/[/:\-T]/);

    if (showTime) return `${dd}/${mm}/${yyyy} ${hh}:${mi}`;
    return `${dd}/${mm}/${yyyy}`;
  }

  public name = this.data.patient.name;
  public cpf = this.data.patient_cpf;
  public phone_number = this.data.patient.phone_number;
  public date_of_birth = this.data.patient.date_of_birth;
  public scheduled_date = this.data.scheduled_at;
  public doctor_name = this.data.doctor_name;
  public exam_type = this.data.exam;

  ngOnInit(): void {}
}
