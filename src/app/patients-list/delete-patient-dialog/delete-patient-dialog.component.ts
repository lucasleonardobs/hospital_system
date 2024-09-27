import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { cpfMask } from 'src/app/utils/cpfMask';
import { openInfoDialog } from 'src/app/utils/infoDialogMessage';
import { PatientsListService } from '../patients-list.service';

@Component({
  selector: 'app-delete-patient-dialog',
  templateUrl: './delete-patient-dialog.component.html',
  styleUrls: ['./delete-patient-dialog.component.sass'],
})
export class DeletePatientDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private infoDialog: MatDialog,
    private patientsService: PatientsListService,
    public dialogRef: MatDialogRef<DeletePatientDialogComponent> // @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  public cpfMask = cpfMask
  public cpf = this.data.cpf;

  deletePatient(): void {
    try {
      this.patientsService
        .deletePatient({ cpf: this.cpf })
        .subscribe((data: Response) =>
          console.log('Usuário deletado com sucecsso!')
        );
      openInfoDialog({
        dialogRef: this.infoDialog,
        operation: 'delete',
        type: 'success',
      });
      this.closeDialog();
    } catch (error) {
      openInfoDialog({
        dialogRef: this.infoDialog,
        operation: 'delete',
        type: 'error',
      });
      console.log('Erro ao deletar um paciente', error);
    }
  }

  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
