import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Solicitacao } from '../../../models/solicitacao';
import { SolicitacaoService } from '../../../services/solicitacao-service';
import { translateEstado } from '../../../models/enums/estados-solicitacao';
import {formataData, getClasseEstado} from '../../../utils/utils';
import {ModalVisualizarSolicitacao} from '../../../shared/modal/modal-visualizar-solicitacao/modal-visualizar-solicitacao';
import {LoadingOverlayComponent} from '../../../shared/loading-overlay.component';
import {finalize} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {APIResponse} from '../../../../api/api';
import {ToastrModule, ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-funcionario-apresentar-solicitacoes',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LoadingOverlayComponent, ModalVisualizarSolicitacao, ToastrModule],
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
    private toastService: ToastrService,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.carregarSolicitacoes();
  }

  onFiltroChange(value: string) {
    if (value === 'Todas' || value === 'Hoje') {
      this.dataInicial = '';
      this.dataFinal = '';
    }
  }

  abrirSolicitacao(s: Solicitacao) {
    this.solicitacaoSelecionada = s;
    this.cdr.detectChanges();
  }

  carregarSolicitacoes(): void {
    this.loading = true;

    this.solicitacaoService.buscarTodas(
      this.statusSelecionado != -1 ? [this.statusSelecionado] : null, 
      this.filtroSelecionado == 'Hoje', 
      this.dataInicial, 
      this.dataFinal
    )
      .pipe(finalize(() => this.endLoad()))
      .subscribe({
        next: (solicitacoes) => {
          //aqui deveria ser this.solicitacoes = solicitacoes, para depois filtrar, mas por hora vou deixar assim pra não ter que mudar o template
          this.solicitacoesFiltradas = solicitacoes;
          this.loading = false;
          this.cdr.detectChanges();
        },
          error: (err: HttpErrorResponse & { error: APIResponse<any> }) => {
            this.toastService.error(err.error.message);
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
