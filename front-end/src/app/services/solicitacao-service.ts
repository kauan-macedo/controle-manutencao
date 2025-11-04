import { Injectable } from '@angular/core';
import { EstadosSolicitacao } from '../models/enums/estados-solicitacao';
import { Solicitacao } from '../models/solicitacao';
import { ToastService } from './toast-service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_URL, APIResponse } from '../../api/api';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true
  }

  constructor(private toastService: ToastService, private httpClient: HttpClient) { }


  //Observable
  //lembrando que so esta buscando solicitacoes em ate 1 pagina (15 solicitacoes)
 buscarTodas(): Observable<Solicitacao[]> {
    const ate = new Date();
    const de = new Date();
    de.setFullYear(ate.getFullYear() - 100); 

    const formatDate = (date: Date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    let params = new HttpParams();
    params = params.append('de', formatDate(de));
    params = params.append('ate', formatDate(ate));
    params = params.append('page', '0');

    return this.httpClient.get<APIResponse<Solicitacao[]>>(
      API_URL + "/solicitacao",
      { ...this.httpOptions, params: params }
    ).pipe(
      map((res) => res.body)
    );
  }


  //Observable
  buscarPorId(id: number): Observable<Solicitacao>{
    return this.httpClient.get<APIResponse<Solicitacao>>(
      API_URL + "/solicitacao/" + id,
      this.httpOptions
    ).pipe(
          map((res) => res.body)
        )
  }



  //Observable
  adicionarSolicitacao(solicitacao: Solicitacao): Observable<APIResponse<any>>{
    debugger
    return this.httpClient.post<APIResponse<any>>(
      API_URL + "/solicitacao",
      JSON.stringify(({
        desc_defeito: solicitacao.descricaoDefeito,
        desc_equipamento: solicitacao.descricaoEquipamento,
        categoria_id: solicitacao.categoria.id
      })),
      this.httpOptions
    );
  }
}

