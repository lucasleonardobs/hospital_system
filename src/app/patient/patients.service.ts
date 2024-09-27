import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BrokerBackendService } from '../broker-backend.service';
import axios from 'axios';

type findAllPatientsParams = {
  priority?: number;
};
@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  relativeUrl = '/waiting-list';

  constructor(private brokerBackend: BrokerBackendService) {}

  findAllPatients(params: any): Observable<any> {
    return this.brokerBackend.request({
      httpMethod: 'GET',
      params,
      relativeUrl: this.relativeUrl,
      headers: this.getSimpleHeader(),
    });
  }

  // addPatient({
  //   cpf,
  //   priority,
  // }: {
  //   cpf: string;
  //   priority: number;
  // }): Observable<any> {
  //   return this.brokerBackend.request({
  //     httpMethod: 'POST',
  //     body: {
  //       cpf,
  //       priority,
  //     },
  //     relativeUrl: this.relativeUrl,
  //     headers: this.getSimpleHeader(),
  //   });
  // }

  async addPatient({
    cpf,
    priority,
  }: {
    cpf: string;
    priority: number;
  }): Promise<any> {
    return await axios
      .post('http://localhost:3333/waiting-list', {
        cpf,
        priority,
      })
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



  setPatientAttended(cpf: string): Observable<any> {
    return this.brokerBackend.request({
      httpMethod: 'PATCH',
      relativeUrl: `${this.relativeUrl}/${cpf}`,
      headers: this.getSimpleHeader(),
    });
  }
  deletePatient(cpf: string): Observable<any> {
    return this.brokerBackend.request({
      httpMethod: 'DELETE',
      relativeUrl: `${this.relativeUrl}/${cpf}`,
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
  findPatientRegisterByCpf({ cpf }: { cpf: string }): Observable<any> {
    return this.brokerBackend.request({
      httpMethod: 'GET',
      relativeUrl: `/patients/${cpf}`,
      headers: this.getSimpleHeader(),
    });
  }
  getSimpleHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
}
