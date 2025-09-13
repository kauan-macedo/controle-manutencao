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
}
