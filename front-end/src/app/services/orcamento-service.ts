import { Injectable } from '@angular/core';
import { StorageService } from './storage-service';
import { Solicitacao } from '../models/solicitacao';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {
  private readonly SOLICITACOES_KEY = 'solicitacoes';
  private readonly LOGGED_USER_KEY = 'usuarioLogado';

  constructor(private storageService: StorageService) { }

  efetuarOrcamento(solicitacaoId: number, valor: number): Solicitacao | null {
    const todasAsSolicitacoes: Solicitacao[] = this.storageService.getDados(this.SOLICITACOES_KEY) || [];

    const funcionarioLogado = this.storageService.getDados(this.LOGGED_USER_KEY) as unknown as Usuario | null;

    if (!funcionarioLogado) {
      console.error('Nenhum funcionário logado encontrado para registrar o orçamento.');
      return null;
    }

    const index = todasAsSolicitacoes.findIndex(s => s.id === solicitacaoId);

    if (index !== -1) {
      const solicitacaoAtual = todasAsSolicitacoes[index];

      solicitacaoAtual.valorOrcamento = valor;
      solicitacaoAtual.dataOrcamento = new Date().toISOString();
      solicitacaoAtual.funcionarioOrcamentoId = funcionarioLogado.id;
      solicitacaoAtual.estado = 'ORÇADA';

      this.storageService.salvarDados(this.SOLICITACOES_KEY, todasAsSolicitacoes);
      
      return solicitacaoAtual;
    }

    return null;
  }
}
