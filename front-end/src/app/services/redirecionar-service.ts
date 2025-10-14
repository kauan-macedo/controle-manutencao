import { Injectable } from '@angular/core';
import { StorageService } from './storage-service';
import { Solicitacao } from '../models/solicitacao';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class RedirecionarService {
  private readonly SOLICITACOES_KEY = 'solicitacoes';
  private readonly LOGGED_USER_KEY = 'usuarioLogado';

  constructor(private storageService: StorageService) { }

  redirecionarManutencao(solicitacaoId: number, novoFuncionarioId: number): Solicitacao | null {
    const todasAsSolicitacoes: Solicitacao[] = this.storageService.getDados(this.SOLICITACOES_KEY) || [];

    const funcionarioLogado = this.storageService.getDados(this.LOGGED_USER_KEY) as unknown as Usuario | null;

    if (!funcionarioLogado) {
      console.error('Efetue o login para redirecionar.');
      return null;
    }

    const index = todasAsSolicitacoes.findIndex(s => s.id === solicitacaoId);

    /**
     *  Não pensei exatamente em como implementar o histórico de redirects, deixei os
     *  dados avulsos por enquanto
     * 
     *  Fora isso creio que o service esteja pronto
     */

    let dataRedirect: string;
    let funcionarioAnteriorId: number;
    let funcionarioPosteriorId: number;

    if (index !== -1) {
      if (funcionarioLogado.id == novoFuncionarioId) return null;

      const solicitacaoAtual = todasAsSolicitacoes[index];

      dataRedirect = new Date().toISOString();
      funcionarioAnteriorId = funcionarioLogado.id;
      funcionarioPosteriorId = novoFuncionarioId;

      solicitacaoAtual.estado = 'REDIRECIONADA';

      this.storageService.salvarDados(this.SOLICITACOES_KEY, todasAsSolicitacoes);
      
      return solicitacaoAtual;
    }

    return null;
  }
}
