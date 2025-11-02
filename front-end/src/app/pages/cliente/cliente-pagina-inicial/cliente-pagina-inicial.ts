import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClienteCriarSolicitacao } from '../cliente-criar-solicitacao/cliente-criar-solicitacao';
import { Solicitacao } from '../../../models/solicitacao';
import { SolicitacaoService } from '../../../services/solicitacao-service';
import { ToastComponent } from '../../../shared/toast-component/toast-component';
import { ToastService } from '../../../services/toast-service';
import {
  EstadosSolicitacao,
  translateEstado,
} from '../../../models/enums/estados-solicitacao';

@Component({
  selector: 'app-cliente-pagina-inicial',
  imports: [
    ClienteCriarSolicitacao,
    CommonModule,
    RouterModule,
    ToastComponent,
  ],
  templateUrl: './cliente-pagina-inicial.html',
  styleUrl: './cliente-pagina-inicial.css',
})
export class ClientePaginaInicial implements OnInit {
  exibirModal: boolean = false;
  minhasSolicitacoes: Solicitacao[] = [];

  constructor(
    private solicitacaoService: SolicitacaoService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {}

  //deixando essa funcao fora do ngoninit para poder chamar ela ao fechar o modal
  carregarSolicitacoes(): void {
    this.solicitacaoService.buscarTodas().subscribe({
      next: (solicitacoes) => {
        this.minhasSolicitacoes = solicitacoes;
        this.cdr.detectChanges(); // 👈 força atualização do template
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

  abrirModal(): void {
    this.exibirModal = true;
  }

  fecharModal(): void {
    this.exibirModal = false;
    this.carregarSolicitacoes();
  }

  traduzirEstado(estd: EstadosSolicitacao): string {
    return translateEstado(estd);
  }
}
