import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { BrokerBackendService } from '../broker-backend.service';
import { environment } from '../../environments/environment';
import { Patient } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class PatientsListService {
  constructor(private brokerBackend: BrokerBackendService) {}
  apiUrl = environment.apiBaseUrl;
  relativeUrl = '/patients';
  url = this.apiUrl + this.relativeUrl;

  getSimpleHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
  findAllPatients(): Observable<any> {
    return this.brokerBackend.request({
      httpMethod: 'GET',
      relativeUrl: this.relativeUrl,
      headers: this.getSimpleHeader(),
    });
  }

  findPatientByCpf({ cpf }: { cpf: string }): Observable<any> {
    return this.brokerBackend.request({
      httpMethod: 'GET',
      relativeUrl: `${this.relativeUrl}/${cpf}`,
      headers: this.getSimpleHeader(),
    });
  }

  async addPatient(body: Patient): Promise<any> {
    return await axios
      .post(`${this.url}`, body)
      .then((res) => {
        return {
          data: res.data,
          message: 'Adição feita com sucesso',
          error: false,
        };
      })
      .catch(() => {
        return {
          message: 'Adição não foi realizada com sucesso',
          error: true,
        };
      });
  }
  async editPatient(cpf: string, body: Omit<Patient,'cpf'>): Promise<any> {
    return await axios
      .put(`${this.url}/${cpf}`, body)
      .then((res) => {
        return {
          data: res.data,
          message: 'Adição feita com sucesso',
          error: false,
        };
      })
      .catch(() => {
        return {
          message: 'Adição não foi realizada com sucesso',
          error: true,
        };
      });
  }

  deletePatient({ cpf }: { cpf: string }): Observable<any> {
    return this.brokerBackend.request({
      httpMethod: 'DELETE',
      relativeUrl: `${this.relativeUrl}/${cpf}`,
      headers: this.getSimpleHeader(),
    });
  }
}
