import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Solicitacao } from '../../../models/solicitacao';
import { SolicitacaoService } from '../../../services/solicitacao-service';
import { ToastService } from '../../../services/toast-service';
import { EstadosSolicitacao, translateEstado } from '../../../models/enums/estados-solicitacao';
import { SpinnerComponent } from '../../../shared/loading-spinner/spinner';
import { formataData } from '../../../utils/utils';

@Component({
  selector: 'app-funcionario-apresentar-solicitacoes',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SpinnerComponent],
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
  isLoading: boolean = false;

  translateEstado = translateEstado
  formataData = formataData

  constructor(private solicitacaoService: SolicitacaoService, private toastService: ToastService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.carregarSolicitacoes();
  }

 carregarSolicitacoes(): void {
  this.isLoading = true;
  let hoje = this.filtroSelecionado == 'Hoje';

    this.solicitacaoService.buscarTodas(hoje, hoje ? null : this.dataInicial.trim(), hoje ? null : this.dataFinal).subscribe({
      next: (solicitacoes) => {
        
        //aqui deveria ser this.solicitacoes = solicitacoes, para depois filtrar, mas por hora vou deixar assim pra não ter que mudar o template
        this.solicitacoesFiltradas = solicitacoes;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao carregar solicitações:', error);
        this.toastService.showError('Erro ao carregar solicitações.');
      },
    });
  }


  // Lógica de cores por estado
  public getClasseEstado(estado: EstadosSolicitacao): string {
    switch (estado) {
      // Requisito: Cinza
      case EstadosSolicitacao.NOVA:
        return 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200';

      // Requisito: Marrom
      case EstadosSolicitacao.ORCADA:
        return 'bg-amber-200 text-amber-800 dark:bg-amber-800 dark:text-amber-100';

      // Requisito: Vermelho
      case EstadosSolicitacao.REJEITADA:
        return 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-100';

      // Requisito: Amarelo
      case EstadosSolicitacao.APROVADA:
        return 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';

      // Requisito: Roxo
      case EstadosSolicitacao.REDIRECIONADA:
        return 'bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-100';

      // Requisito: Azul
      case EstadosSolicitacao.ARRUMADA:
        return 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-100';

      // Requisito: Laranja
      case EstadosSolicitacao.PAGA:
        return 'bg-orange-200 text-orange-800 dark:bg-orange-800 dark:text-orange-100';

      // Requisito: Verde
      case EstadosSolicitacao.FINALIZADA:
        return 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-100';

      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}
