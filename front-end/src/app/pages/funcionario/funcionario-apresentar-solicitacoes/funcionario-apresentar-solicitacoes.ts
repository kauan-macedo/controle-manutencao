import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Solicitacao } from '../../../models/solicitacao';
import { SolicitacaoService } from '../../../services/solicitacao-service';
import { ToastService } from '../../../services/toast-service';
import { translateEstado } from '../../../models/enums/estados-solicitacao';
import {formataData, getClasseEstado} from '../../../utils/utils';
import {ModalVisualizarSolicitacao} from '../../../shared/modal/modal-visualizar-solicitacao/modal-visualizar-solicitacao';
import {LoadingOverlayComponent} from '../../../shared/loading-overlay.component';

@Component({
  selector: 'app-funcionario-apresentar-solicitacoes',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LoadingOverlayComponent, ModalVisualizarSolicitacao],
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
  statusSelecionado: number = -1;
  loading = false;

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
    this.loading = true;
    let hoje = this.filtroSelecionado == 'Hoje';

    this.solicitacaoService.buscarTodas([this.statusSelecionado], hoje && this.filtroSelecionado != 'Todas', hoje && this.filtroSelecionado != 'Todas' ? null : this.dataInicial.trim(), hoje && this.filtroSelecionado != 'Todas' ?  null : this.dataFinal).subscribe({
      next: (solicitacoes) => {
        //aqui deveria ser this.solicitacoes = solicitacoes, para depois filtrar, mas por hora vou deixar assim pra não ter que mudar o template
        this.solicitacoesFiltradas = solicitacoes;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao carregar solicitações:', error);
        this.toastService.showError('Erro ao carregar solicitações.');
      },
      complete: () => {
        this.endLoad();
      }
    });
  }

  endLoad = () => {
    setTimeout(() => {
      this.loading = false;
      this.cdr.detectChanges();
    })
  }

}
