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

  getSolicitacoesCliente(): Solicitacao[] {
    return this.storageService.getDados(this.STORAGE_KEY);
    //return localStograge[STORAGE_KEY];
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
