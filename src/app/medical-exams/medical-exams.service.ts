import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BrokerBackendService } from '../broker-backend.service';

interface MedicalExam {
    cpf: string;
    exam: string;
    doctor_name: string;
    scheduled_at: string
}
@Injectable({
  providedIn: 'root',
})
export class MedicalExamsService {
  constructor(private brokerBackend: BrokerBackendService) {}

  apiUrl = environment.apiBaseUrl;
  relativeUrl = '/exams';
  url = this.apiUrl + this.relativeUrl;

  getSimpleHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  async scheduleExam(data: MedicalExam): Promise<any> {
    return await axios
      .post(this.url, data)
      .then((res) => {
        return {
          data: res.data,
          message: 'Marcação de exam feita com sucesso',
          error: false,
        };
      })
      .catch(() => {
        return {
          message: 'Marcação de exame não foi realizada com sucesso',
          error: true,
        };
      });
  }

  findAllExams(): Observable<any> {
    return this.brokerBackend.request({
      httpMethod: 'GET',
      relativeUrl: this.relativeUrl,
      headers: this.getSimpleHeader(),
    });
  }
  findExamByPatientCpf({ cpf }: { cpf: string }): Observable<any> {
    return this.brokerBackend.request({
      httpMethod: 'GET',
      relativeUrl: `${this.relativeUrl}/${cpf}`,
      headers: this.getSimpleHeader(),
    });
  }

  deleteExamAppointment({ cpf }: { cpf: string }): Observable<any> {
    return this.brokerBackend.request({
      httpMethod: 'DELETE',
      relativeUrl: `${this.relativeUrl}/${cpf}`,
      headers: this.getSimpleHeader(),
    });
  }
}
