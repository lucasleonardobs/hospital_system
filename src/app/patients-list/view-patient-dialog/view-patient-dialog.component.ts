import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from 'src/types';
import { phoneMask } from '../../utils/phoneMask';
import { cpfMask } from '../../utils/cpfMask';
import { cepMask } from '../../utils/cepMask';
@Component({
  selector: 'app-view-patient-dialog',
  templateUrl: './view-patient-dialog.component.html',
  styleUrls: ['./view-patient-dialog.component.sass'],
})
export class ViewPatientDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Patient) {}
  public phoneMask = phoneMask;
  public cpfMask = cpfMask;
  public cepMask = cepMask;
  
  formatDate(date: string) {
    const formatedDate = date,
      [yyyy, mm, dd, hh, mi] = date.split(/[/:\-T]/);
    return `${dd}/${mm}/${yyyy}`;
  }

  public genders: any = {
    male: 'Masculino',
    female: 'Feminino',
    others: 'Outros',
  };

  ngOnInit(): void {}

  public patient = this.data;
}
