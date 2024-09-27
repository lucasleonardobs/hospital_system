import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { cpfMask } from 'src/app/utils/cpfMask';
import { openInfoDialog } from 'src/app/utils/infoDialogMessage';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'app-delete-patient-waiting-list-dialog',
  templateUrl: './delete-patient-waiting-list-dialog.component.html',
  styleUrls: ['./delete-patient-waiting-list-dialog.component.sass'],
})
export class DeletePatientWaitingListDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public infoDialog: MatDialog,
    private patientsService: PatientsService,
    public dialogRef: MatDialogRef<DeletePatientWaitingListDialogComponent> // @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  public cpf = this.data.cpf;
  public cpfMask = cpfMask;


  deletePatient(): void {
    try {
      this.patientsService.deletePatient(this.cpf).subscribe(
        (data: Response) => console.log('Usuário deletado com sucecsso!'),
        (err: any) => console.log('Erro ao listar os pacientes', err)
      );
      openInfoDialog({
        dialogRef: this.infoDialog,
        operation: 'delete',
        type: 'success',
      });
      this.closeDialog();
    } catch (error) {
      console.log('error', error)
    }
  }

  ngOnInit(): void {}
  closeDialog(): void {
    this.dialogRef.close();
  }
}
