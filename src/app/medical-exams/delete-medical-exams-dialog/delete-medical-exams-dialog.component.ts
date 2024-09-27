import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { cpfMask } from 'src/app/utils/cpfMask';
import { openInfoDialog } from 'src/app/utils/infoDialogMessage';
import { MedicalExamsService } from '../medical-exams.service';

@Component({
  selector: 'app-delete-medical-exams-dialog',
  templateUrl: './delete-medical-exams-dialog.component.html',
  styleUrls: ['./delete-medical-exams-dialog.component.sass'],
})
export class DeleteMedicalExamsDialogComponent implements OnInit {
  ngOnInit(): void {}
  constructor(
    public infoDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { cpf: string },
    private medicalExamsService: MedicalExamsService,
    public dialogRef: MatDialogRef<DeleteMedicalExamsDialogComponent>
  ) {}


  public cpfMask = cpfMask
  public cpf = this.data.cpf;
  
  deletePatient(): void {
    try {
      this.medicalExamsService
        .deleteExamAppointment({ cpf: this.cpf })
        .subscribe(
          (data: Response) => console.log('Usuário deletado com sucecsso!'),
          (err: any) => console.log('Erro ao deletar o paciente', err)
        );
      openInfoDialog({
        dialogRef: this.infoDialog,
        operation: 'delete',
        type: 'success',
      });
      this.closeDialog();
    } catch (error) {}
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
