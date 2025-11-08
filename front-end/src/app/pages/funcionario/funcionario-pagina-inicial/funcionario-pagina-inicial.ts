import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SolicitacaoService } from '../../../services/solicitacao-service';
import { Solicitacao } from '../../../models/solicitacao';
import { ToastService } from '../../../services/toast-service';
import { EstadosSolicitacao, translateEstado } from '../../../models/enums/estados-solicitacao';
import { map } from 'rxjs/operators';
import { formataData } from '../../../utils/utils';
import { LoadingOverlayComponent } from '../../../shared/loading-overlay.component';

@Component({
  selector: 'app-funcionario-pagina-inicial',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LoadingOverlayComponent],
  templateUrl: './funcionario-pagina-inicial.html',
  styleUrls: ['./funcionario-pagina-inicial.css']
})
export class FuncionarioPaginaInicial implements OnInit {
  translateEstado = translateEstado
  formataData = formataData
  dropdown: string[] = ['Todas', 'Hoje', 'Selecionar Período:'];
  filtroSelecionado: string = '';
  dataInicial: string = '';
  dataFinal: string = '';
  hoje = false;

  solicitacoesAbertas: Solicitacao[] = [];
  loading = false;

  constructor(private solicitacaoService: SolicitacaoService, private toastService: ToastService, private cdr: ChangeDetectorRef) {}

  carregarSolicitacoes(): void {
    this.loading = true;
    this.solicitacaoService.buscarTodas(1, false, null, null)
      .subscribe({
      next: (solicitacoes) => {
        this.solicitacoesAbertas = solicitacoes;
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

  ngOnInit(): void {
     this.carregarSolicitacoes();
  }

  endLoad = () => {
    setTimeout(() => {
        this.loading = false;
        this.cdr.detectChanges();
      })
  }

}