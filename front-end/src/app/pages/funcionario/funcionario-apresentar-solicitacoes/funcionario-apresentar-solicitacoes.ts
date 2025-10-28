import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Solicitacao } from '../../../models/solicitacao';
import { SolicitacaoService } from '../../../services/solicitacao-service';
import { ToastService } from '../../../services/toast-service';

@Component({
  selector: 'app-funcionario-apresentar-solicitacoes',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe, FormsModule],
  templateUrl: './funcionario-apresentar-solicitacoes.html',
  styleUrl: './funcionario-apresentar-solicitacoes.css'
})
export class FuncionarioApresentarSolicitacoes implements OnInit {

  dropdown: string[] = ['Todas', 'Hoje', 'Selecionar Período:'];

  filtroSelecionado: string = 'Todas';

  dataInicial: string = '';
  dataFinal: string = '';

  solicitacoes: Solicitacao[] = [];
  solicitacoesFiltradas: Solicitacao[] = [];


  constructor(private solicitacoesService: SolicitacaoService, private toastService: ToastService, private cdr: ChangeDetectorRef) {
  }

  async ngOnInit(): Promise<void> {
    this.solicitacoes = await this.solicitacoesService.listarTodas((msg) => {
      // TODO: mostrar erro para o usuario
      this.toastService.showError(msg);
    });
    this.aplicarFiltro();
    this.cdr.detectChanges();
  }

  aplicarFiltro() {
    if (this.filtroSelecionado === 'Hoje') {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      this.solicitacoesFiltradas = this.solicitacoes.filter(s => {
        const dataSolicitacao = new Date(s.dataHora);
        dataSolicitacao.setHours(0, 0, 0, 0);
        return dataSolicitacao.getTime() === hoje.getTime();
      });
    } else if (this.filtroSelecionado === 'Selecionar Período:') {
      if (!this.dataInicial || !this.dataFinal) return;

      const dip = this.dataInicial.split('-');
      const dfp = this.dataFinal.split('-');

      const dataInicialCorrigida = new Date(+dip[0], +dip[1] - 1, +dip[2]);
      const dataFinalCorrigida = new Date(+dfp[0], +dfp[1] - 1, +dfp[2]);

      this.solicitacoesFiltradas = this.solicitacoes.filter(s => {
        const dataSolicitacao = new Date(s.dataHora);
        dataSolicitacao.setHours(0, 0, 0, 0);
        return dataSolicitacao >= dataInicialCorrigida && dataSolicitacao <= dataFinalCorrigida;
      });
    } else {
      // Todas
      this.solicitacoesFiltradas = [...this.solicitacoes];
    }
  }


  // Lógica de cores por estado
  public getClasseEstado(estado: string): string {
    switch (estado.toUpperCase()) {
      // Requisito: Cinza
      case 'ABERTA':
        return 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200';

      // Requisito: Marrom
      case 'ORÇADA':
        return 'bg-amber-200 text-amber-800 dark:bg-amber-800 dark:text-amber-100';

      // Requisito: Vermelho
      case 'REJEITADA':
        return 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-100';

      // Requisito: Amarelo
      case 'APROVADA':
        return 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';

      // Requisito: Roxo
      case 'REDIRECIONADA':
        return 'bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-100';

      // Requisito: Azul
      case 'ARRUMADA':
        return 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-100';

      // Requisito: Laranja
      case 'PAGA':
        return 'bg-orange-200 text-orange-800 dark:bg-orange-800 dark:text-orange-100';

      // Requisito: Verde
      case 'FINALIZADA':
        return 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-100';

      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}
