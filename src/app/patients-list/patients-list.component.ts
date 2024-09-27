import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewPatientDialogComponent } from './view-patient-dialog/view-patient-dialog.component';
import { CreatePatientDialogComponent } from './create-patient-dialog/create-patient-dialog.component';
import { DeletePatientDialogComponent } from './delete-patient-dialog/delete-patient-dialog.component';
import { EditPatientDialogComponent } from './edit-patient-dialog/edit-patient-dialog.component';
import { PatientsListService } from './patients-list.service';
import { Patient } from '../../types';
import { lastValueFrom } from 'rxjs';
import parseDate from '../utils/parseDate';
import { checkNumberInput } from '../utils/checkNumberInput';
import { cpfMask } from '../utils/cpfMask';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.sass'],
})
export class PatientsListComponent implements OnInit {
  constructor(
    public matDialog: MatDialog,
    private patientsListService: PatientsListService
  ) {}

  displayedColumns: string[] = ['cpf', 'name', 'date_of_birth', 'actions'];
  dataSource: any = [];
  searchError: string = '';
  public checkNumberInput = checkNumberInput;
  public patientFound: boolean = false;
  public searchByCpf: string = '';
  public formatDate = parseDate;
  public loading: boolean = true;
  public cpfMask = cpfMask
  async refreshData(): Promise<any> {
    try {
      await lastValueFrom(this.patientsListService.findAllPatients()).then(
        (result) => {
          this.dataSource = result.body;
        }
      );
      this.loading = false;

    } catch (err) {
      console.log('Erro ao listar os pacientes', err);
    }
  }

  cleanSearch(): void {
    this.searchByCpf = '';
    this.searchError = '';
    this.refreshData();
    this.patientFound = false;
  }

  async searchPatientByCpf(): Promise<any> {
    if (this.searchByCpf.length === 0 || this.searchByCpf.length < 11) {
      return (this.searchError = 'CPF inexistente');
    }

    try {
      await lastValueFrom(
        this.patientsListService.findPatientByCpf({ cpf: this.searchByCpf })
      ).then((result) => {
        this.patientFound = true;
        this.searchError = '';
        return (this.dataSource = [result.body]);
      });
    } catch (err) {
      console.log('err', err);
      return (this.searchError = 'CPF inexistente');
    }
  }

  ngOnInit(): void {

    this.refreshData();
  }

  openCreatePatientDialog(): any {
    const dialogRef = this.matDialog.open(CreatePatientDialogComponent, {
      width: '700px',
      maxHeight: '500px',
    });

    dialogRef.afterClosed().subscribe(() => this.refreshData());
  }

  openEditPatientDialog(patient: Patient): void {
    const dialogRef = this.matDialog.open(EditPatientDialogComponent, {
      width: '600px',
      maxHeight: '500px',
      data: patient,
    });
    dialogRef.afterClosed().subscribe(() => this.refreshData());
  }
  openDeletePatientDialog({ cpf }: { cpf: string }): void {
    const dialogRef = this.matDialog.open(DeletePatientDialogComponent, {
      data: {
        cpf,
      },
      width: '350px',
      height: '160px',
    });
    dialogRef.afterClosed().subscribe(() => this.refreshData());
  }

  openViewPatientDialog(data: Patient): void {
    this.matDialog.open(ViewPatientDialogComponent, {
      data,
      width: '600px',
      maxHeight: '500px',
    });
  }
}
