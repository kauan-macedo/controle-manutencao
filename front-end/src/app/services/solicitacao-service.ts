import { Injectable } from '@angular/core';
import { EstadosSolicitacao } from '../models/enums/estados-solicitacao';
import { Solicitacao } from '../models/solicitacao';
import { ToastService } from './toast-service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_URL, APIResponse } from '../../api/api';
import { AtualizarSolicitacaoInput } from '../models/dto/atualizar-solicitacao-dto';

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
 buscarTodas(status: number, hoje: boolean, de: string | null, ate: string | null): Observable<Solicitacao[]> {
    let params = new HttpParams();
    params = de == null || de.trim() == "" ? params : params.append('de', new Date(de).toLocaleDateString("pt-BR"));
    params = ate == null || ate.trim() == "" ? params : params.append('ate', new Date(ate).toLocaleDateString("pt-BR"));
    params = hoje ? params.append('de', new Date().toLocaleDateString("pt-BR")).append('ate', new Date().toLocaleDateString("pt-BR")) : params;
    params = status != -1 ? params.append('status', status) : params;
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

  atualizarSolicitacao(idS: number, d: Partial<AtualizarSolicitacaoInput>): Observable<APIResponse<any>> {
    return this.httpClient.put<APIResponse<any>>(
      `${API_URL}/solicitacao/${idS}`,
      JSON.stringify(d),
      this.httpOptions
    )
  }
}

