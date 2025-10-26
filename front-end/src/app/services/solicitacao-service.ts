import { Injectable } from '@angular/core';
import { Solicitacao } from '../models/solicitacao';
import { buscaSolicitacoes, novaSolicitacao, NovaSolicitacaoInput } from '../../api/solicitacoes'; 
import { ToastService } from './toast-service';


@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {

  constructor(private toastService: ToastService) { }

  async listarTodas(onError?: (msg: string) => void): Promise<Solicitacao[]> {
    const ate = new Date();
    const de = new Date();
    de.setFullYear(ate.getFullYear() - 1);

    const formatDate = (date: Date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    const response = await buscaSolicitacoes(0, { 
      de: formatDate(de),
      ate: formatDate(ate)
    });
    
    if (response.error && onError) {
      onError(response.message);
    }
    return response.body || [];
  }


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

