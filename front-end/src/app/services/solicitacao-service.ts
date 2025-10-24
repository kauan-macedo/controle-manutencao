import { Injectable } from '@angular/core';
import { StorageService } from './storage-service';
import { Solicitacao } from '../models/solicitacao';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
  private readonly STORAGE_KEY = 'solicitacoes';

  constructor(private storageService: StorageService) {
    const solicitacoesExistentes = this.storageService.getDados(this.STORAGE_KEY);
  }

  // Devem haver dois métodos que 
  // busquem as solicitações no Local Storage:
  //
  // 1.
  // Um método que busque as solicitações por Cliente 
  // (para exibir na página inicial do cliente) e uma 
  // que retorne todas as solicitações.
  //
  //  Caso abaixo (atualmente retorna todas as
  //  solicitações, no entanto,é um fluxo que
  //  se fecha no cliclo do cliente,
  //  uma vez que no
  //  perfil do funcionário essas solicitações
  //  cadastradas não são exibidas):
  //
  getSolicitacoesCliente(/* idCliente: number */): Solicitacao[] {
    
    // const solicitacoes: Solicitacao[] = this
    //                                       .storageService
    //                                       .getDados(this.STORAGE_KEY);
    // return solicitacoes.filter( (obj, index, arr) => {
    //
    //    obj.id === idCliente
    //
    // }) || [];

    return this.storageService.getDados(this.STORAGE_KEY);
  }

  // Abaixo seria, funcionalmente, um
  // método como o acima, no entanto, 
  // com a nomenclatura correta:

  async getSolicitacoes(onError?: (msg: string) => void): Promise<Solicitacao[]> {
    return [];
    // return this.storageService.getDados(this.STORAGE_KEY);
  
  }


  adicionarSolicitacao(novaSolicitacao: Solicitacao): void {
    const solicitacoes = this.getSolicitacoesCliente();

    if (solicitacoes.length > 0) {
      novaSolicitacao.id = solicitacoes.length + 1;
    } else {
      novaSolicitacao.id = 1;
    }

    solicitacoes.push(novaSolicitacao);
    this.storageService.salvarDados(this.STORAGE_KEY, solicitacoes);
  }

  atualizarSolicitacao(solicitacaoAtualizada: Solicitacao): void {
    const solicitacoes = this.getSolicitacoesCliente();
    const index = solicitacoes.findIndex(s => s.id === solicitacaoAtualizada.id);

    if (index !== -1) {
      solicitacoes[index] = solicitacaoAtualizada;
      this.storageService.salvarDados(this.STORAGE_KEY, solicitacoes);
    }
  }

  aprovar(solicitacao: Solicitacao): void {
    solicitacao.estado = 'Aprovada';
    this.atualizarSolicitacao(solicitacao);
  }

  rejeitar(solicitacao: Solicitacao): void {
    solicitacao.estado = 'Rejeitada';
    this.atualizarSolicitacao(solicitacao);
  }
}
