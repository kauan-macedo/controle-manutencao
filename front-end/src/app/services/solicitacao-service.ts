import { Injectable } from '@angular/core';
import { EstadosSolicitacao } from '../models/enums/estados-solicitacao';
import { Solicitacao } from '../models/solicitacao';
// Importe a nova função que criamos
import { buscaSolicitacoes, buscaSolicitacaoPorId, novaSolicitacao, NovaSolicitacaoInput } from '../../api/solicitacoes'; 
import { ToastService } from './toast-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_URL, APIResponse } from '../../api/api';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'credentials': 'include'
    })
  }

  constructor(private toastService: ToastService, private httpClient: HttpClient) { }

 
  //funcao para transformar os campos do backend nos campos do front (para nao ter que mudar todos os templates, embora fosse melhor kk)
  private mapApiToModel(item: any): Solicitacao {
    const solicitacao = new Solicitacao(
      item.id,
      item.status,
      item.categoria,
      item.descricaoDefeito,
      item.descricaoEquipamento,
      item.dataCriacao,
      item.dataArrumado,
      item.ativo,
      item.orcamento,
      item.usuario,
      item.responsavel,
      item.historico
    );
    return solicitacao;
  }

  async listarTodas(onError?: (msg: string) => void): Promise<Solicitacao[]> {
    const ate = new Date();
    const de = new Date();
    de.setFullYear(ate.getFullYear() - 1);

    //definindo a data para usar de parametro
    const formatDate = (date: Date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    //chamando a funcao do solicitacoes.ts 
    const response = await buscaSolicitacoes(0, { de: formatDate(de), ate: formatDate(ate)});
    
    if (response.error && onError) {
      onError(response.message);
    }

    if (!response.body) {
      return [];
    }

    //retorna as solicitacoes transformadas com a funcao
    return response.body.map(this.mapApiToModel);
  }

  //Observable

  buscarPorId(id: number): Observable<Solicitacao>{
    return this.httpClient.get<APIResponse<Solicitacao>>(
      API_URL + "/" + id,
      this.httpOptions
    ).pipe(
          map((res) => res.body)
        )
  }

  //Promise
  /**
    async buscarPorId(id: number, onError?: (msg: string) => void): Promise<Solicitacao | null> {
    //chama a funcao de buscar por id
    const response = await buscaSolicitacaoPorId(id);

    if (response.error && onError) {
      onError(response.message);
    }
    if (!response.body) {
      return null;
    }
    //retorna a solicitacao transformada
    return this.mapApiToModel(response.body);
  } */


  //Observable
  adicionarSolicitacao(solicitacao: Solicitacao): Observable<any>{
    return this.httpClient.post<APIResponse<any>>(
      API_URL,
      JSON.stringify(solicitacao),
      this.httpOptions
    ).pipe(
      map((res) => res.body)
    )
  }

  //Promise
  /**
    async adicionarSolicitacao(solicitacao: Solicitacao): Promise<void> {
    const input: NovaSolicitacaoInput = {
      desc_defeito: solicitacao.descricaoDefeito,
      desc_equipamento: solicitacao.descricaoEquipamento,
      categoria_id: solicitacao.categoriaEquipamento.id 
    };

    const response = await novaSolicitacao(input);

    if (response.error) {
      this.toastService.showError(response.message);
    }
  } */
}

