import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL, APIResponse } from '../../api/api';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true
  }

  constructor(private httpClient: HttpClient) { }

  enviarOrcamento(solicitacao_id: number, valor: number, descricao: string): Observable<APIResponse<any>> {
    const body = {
      valor: valor,
      descricao: descricao
    }
    return this.httpClient.post<APIResponse<any>>(
      API_URL + "/solicitacao/orcamento/" + solicitacao_id,
      body,
      this.httpOptions
    );
  }
}