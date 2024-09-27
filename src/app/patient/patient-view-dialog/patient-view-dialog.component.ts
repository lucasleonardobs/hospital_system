import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { cepMask } from 'src/app/utils/cepMask';
import { cpfMask } from 'src/app/utils/cpfMask';
import { phoneMask } from 'src/app/utils/phoneMask';

@Component({
  selector: 'app-patient-view-dialog',
  templateUrl: './patient-view-dialog.component.html',
  styleUrls: ['./patient-view-dialog.component.sass'],
})
export class PatientViewDialogComponent implements OnInit {
  public cpfMask = cpfMask;
  public phoneMask = phoneMask;
  public cepMask = cepMask;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  formatDate(date: string) {
    const formatedDate = date,
      [yyyy, mm, dd, hh, mi] = date.split(/[/:\-T]/);
    return `${dd}/${mm}/${yyyy}`;
  }
  public priorityValue: any = {
    2: 'Alta',
    1: 'Média',
    0: 'Baixa',
  };
  public genders: any = {
    male: 'Masculino',
    female: 'Feminino',
    others: 'Outros',
  };
  public patientData = this.data;

  ngOnInit(): void {}
}
