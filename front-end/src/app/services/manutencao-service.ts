import { Injectable } from '@angular/core';
import { StorageService } from './storage-service';
import { Solicitacao } from '../models/solicitacao';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ManutencaoService {
  private readonly SOLICITACOES_KEY = 'solicitacoes';
  private readonly LOGGED_USER_KEY = 'usuarioLogado';

  constructor(private storageService: StorageService) { }

  efetuarManutencao(solicitacaoId: number, descricaoManutencao: string, instrucoesCliente: string): Solicitacao | null {
    const todasAsSolicitacoes: Solicitacao[] = this.storageService.getDados(this.SOLICITACOES_KEY) || [];

    const funcionarioLogado = this.storageService.getDados(this.LOGGED_USER_KEY) as unknown as Usuario | null;

    if (!funcionarioLogado) {
      console.error('Nenhum funcionário logado encontrado para realizar a manutenção.');
      return null;
    }

    const index = todasAsSolicitacoes.findIndex(s => s.id === solicitacaoId);

    if (index !== -1) {
      const solicitacaoAtual = todasAsSolicitacoes[index];

      solicitacaoAtual.descricaoManutencao = descricaoManutencao;
      solicitacaoAtual.dataManutencao = new Date().toISOString();
      solicitacaoAtual.funcionarioManutencaoId = funcionarioLogado.id;
      solicitacaoAtual.estado = 'ARRUMADA';

      this.storageService.salvarDados(this.SOLICITACOES_KEY, todasAsSolicitacoes);
      
      return solicitacaoAtual;
    }

    return null;
  }
}
