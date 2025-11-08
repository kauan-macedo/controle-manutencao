import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Solicitacao } from '../../../models/solicitacao';
import { SolicitacaoService } from '../../../services/solicitacao-service';
import { ToastService } from '../../../services/toast-service';
import { EstadosSolicitacao, translateEstado } from '../../../models/enums/estados-solicitacao';
import { SpinnerComponent } from '../../../shared/loading-spinner/spinner';
import {formataData, getClasseEstado} from '../../../utils/utils';
import {
  ModalVisualizarSolicitacao
} from '../../../shared/modal/modal-visualizar-solicitacao/modal-visualizar-solicitacao';

@Component({
  selector: 'app-funcionario-apresentar-solicitacoes',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SpinnerComponent, ModalVisualizarSolicitacao],
  templateUrl: './funcionario-apresentar-solicitacoes.html',
  styleUrl: './funcionario-apresentar-solicitacoes.css'
})
export class FuncionarioApresentarSolicitacoes implements OnInit {
  getClasseEstado = getClasseEstado
  solicitacaoSelecionada: Solicitacao | null = null
  dropdown: string[] = ['Todas', 'Hoje', 'Selecionar Período:'];

  filtroSelecionado: string = 'Todas';

  dataInicial: string = '';
  dataFinal: string = '';

  solicitacoes: Solicitacao[] = [];
  solicitacoesFiltradas: Solicitacao[] = [];
  isLoading: boolean = false;
  statusSelecionado: number = -1;

  translateEstado = translateEstado
  formataData = formataData

  constructor(
    private solicitacaoService: SolicitacaoService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.carregarSolicitacoes();
  }

  abrirSolicitacao(s: Solicitacao) {
    this.solicitacaoSelecionada = s;
    this.cdr.detectChanges();
  }

  carregarSolicitacoes(): void {
    this.isLoading = true;
    let hoje = this.filtroSelecionado == 'Hoje';

    this.solicitacaoService.buscarTodas([this.statusSelecionado], hoje && this.filtroSelecionado != 'Todas', hoje && this.filtroSelecionado != 'Todas' ? null : this.dataInicial.trim(), hoje && this.filtroSelecionado != 'Todas' ?  null : this.dataFinal).subscribe({
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

}
