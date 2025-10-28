import { Injectable } from '@angular/core';
import { EstadosSolicitacao } from '../models/enums/estados-solicitacao';
import { Solicitacao } from '../models/solicitacao';
// Importe a nova função que criamos
import { buscaSolicitacoes, buscaSolicitacaoPorId, novaSolicitacao, NovaSolicitacaoInput } from '../../api/solicitacoes'; 
import { ToastService } from './toast-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {

  private BASE_URL = "https://controlemanutencao.betoni.dev/categoria";
  
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
      item.descricaoEquipamento,
      item.categoria,
      item.descricaoDefeito,
      item.usuario.id 
    );
    solicitacao.id = item.id;
    solicitacao.dataHora = new Date(item.dataCriacao).toISOString(); 
    solicitacao.estado = item.status as EstadosSolicitacao; // convertendo para enum
    
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
    return this.httpClient.get<Solicitacao>(
      this.BASE_URL + "/" + id,
      this.httpOptions
    )
  }

  //Promise
  /**async buscarPorId(id: number, onError?: (msg: string) => void): Promise<Solicitacao | null> {
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
  }
}

