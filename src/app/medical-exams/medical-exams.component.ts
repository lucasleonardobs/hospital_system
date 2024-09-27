import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { CreateMedicalExamsDialogComponent } from './create-medical-exams-dialog/create-medical-exams-dialog.component';
import { DeleteMedicalExamsDialogComponent } from './delete-medical-exams-dialog/delete-medical-exams-dialog.component';
import { MedicalExamsService } from './medical-exams.service';
import { ViewMedicalExamsDialogComponent } from './view-medical-exams-dialog/view-medical-exams-dialog.component';
import { MedicalExam } from 'src/types';
import { checkNumberInput } from '../utils/checkNumberInput';
import { cpfMask } from '../utils/cpfMask';
@Component({
  selector: 'app-medical-exams',
  templateUrl: './medical-exams.component.html',
  styleUrls: ['./medical-exams.component.sass'],
})
export class MedicalExamsComponent implements OnInit {
  constructor(
    public matDialog: MatDialog,
    private medicalExamsService: MedicalExamsService
  ) {}
  displayedColumns: string[] = [
    'cpf',
    'name',
    'schedule_date',
    'exam_type',
    'doctor_name',
    'actions',
  ];
  
  public dataSource: any = [];
  public checkNumberInput = checkNumberInput;
  public cpfMask = cpfMask;
  public loading: boolean = true;
  public searchByCpf: string = '';
  public searchError: string = '';
  public patientFound: any = '';

  async searchPatientByCpf(): Promise<any> {
    if (this.searchByCpf.length === 0 || this.searchByCpf.length < 11)
      return (this.searchError = 'Digite um Cpf válido');

    try {
      await lastValueFrom(
        this.medicalExamsService.findExamByPatientCpf({ cpf: this.searchByCpf })
      ).then((result: any) => {
        this.patientFound = result.body;
        return (this.dataSource = [result.body]);
      });
    } catch (err) {
      return (this.searchError = 'Paciente não encontrado, tente outro Cpf...');
    }
  }

  cleanSearch(): void {
    this.searchByCpf = '';
    this.refreshData();
    this.patientFound = false;
  }

  formatDate(date: string) {
    const formatedDate = date,
      [yyyy, mm, dd, hh, mi] = date.split(/[/:\-T]/);
    return `${dd}/${mm}/${yyyy} ${hh}:${mi}`;
  }

  openCreateMedicalExamDialog(): void {
    const dialogRef = this.matDialog.open(CreateMedicalExamsDialogComponent, {
      width: '600px',
      maxHeight: '600px',
    });
    dialogRef.afterClosed().subscribe(() => this.refreshData());
  }
  openDeleteMedicalExamDialog(cpf: string): void {
    const dialogRef = this.matDialog.open(DeleteMedicalExamsDialogComponent, {
      data: {
        cpf,
      },
      width: '350px',
      height: '160px',
    });

    dialogRef.afterClosed().subscribe(() => this.refreshData());
  }

  openViewMedicalExamDialog(data: MedicalExam): void {
    this.matDialog.open(ViewMedicalExamsDialogComponent, {
      width: '600px',
      maxHeight: '500px',
      data,
    });
  }
  async refreshData(): Promise<any> {
    try {
      await lastValueFrom(this.medicalExamsService.findAllExams()).then(
        (result: any) => {
          this.dataSource = result.body;
        }
      );
      this.loading = false;
    } catch (err) {
      console.log('Erro ao listar os pacientes', err);
    }
  }

  ngOnInit(): void {
    this.refreshData();
  }
}
