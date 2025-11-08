import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SolicitacaoService } from '../../../services/solicitacao-service';
import { Solicitacao } from '../../../models/solicitacao';
import { ToastService } from '../../../services/toast-service';
import { EstadosSolicitacao, translateEstado } from '../../../models/enums/estados-solicitacao';
import { SpinnerComponent } from '../../../shared/loading-spinner/spinner';
import { map } from 'rxjs/operators';
import {formataData, getClasseEstado} from '../../../utils/utils';
import {
  ModalVisualizarSolicitacao
} from '../../../shared/modal/modal-visualizar-solicitacao/modal-visualizar-solicitacao';

@Component({
  selector: 'app-funcionario-pagina-inicial',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SpinnerComponent, ModalVisualizarSolicitacao],
  templateUrl: './funcionario-pagina-inicial.html',
  styleUrls: ['./funcionario-pagina-inicial.css']
})
export class FuncionarioPaginaInicial implements OnInit {
  translateEstado = translateEstado
  getClasseEstado = getClasseEstado
  formataData = formataData
  dropdown: string[] = ['Todas', 'Hoje', 'Selecionar Período:'];
  filtroSelecionado: string = '';
  dataInicial: string = '';
  dataFinal: string = '';
  hoje = false;

  solicitacaoAberta: Solicitacao | null = null;

  solicitacoesAbertas: Solicitacao[] = [];
  isLoading: boolean = false;

  constructor(private solicitacaoService: SolicitacaoService, private toastService: ToastService, private cdr: ChangeDetectorRef) {}

  carregarSolicitacoes(): void {
    this.isLoading = true;
    this.solicitacaoService.buscarTodas(
      [
        EstadosSolicitacao.NOVA,
        EstadosSolicitacao.PAGA,
        EstadosSolicitacao.REDIRECIONADA,
        EstadosSolicitacao.APROVADA
      ], false, null, null)
      .subscribe({
      next: (solicitacoes) => {
        this.solicitacoesAbertas = solicitacoes;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao carregar solicitações:', error);
        this.toastService.showError('Erro ao carregar solicitações.');
      },
    });
  }

  ngOnInit(): void {
     this.carregarSolicitacoes();
  }

}
