import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClienteCriarSolicitacao } from '../cliente-criar-solicitacao/cliente-criar-solicitacao';
import { Solicitacao } from '../../../models/solicitacao';
import { SolicitacaoService } from '../../../services/solicitacao-service';
import { ToastComponent } from '../../../shared/toast-component/toast-component';
import { ToastService } from '../../../services/toast-service';
import { EstadosSolicitacao, translateEstado ,} from '../../../models/enums/estados-solicitacao';
import { formataData } from '../../../utils/utils';
import { LoadingOverlayComponent } from '../../../shared/loading-overlay.component';

@Component({
  selector: 'app-cliente-pagina-inicial',
  imports: [
    ClienteCriarSolicitacao,
    CommonModule,
    RouterModule,
    ToastComponent,
    LoadingOverlayComponent
  ],
  templateUrl: './cliente-pagina-inicial.html',
  styleUrl: './cliente-pagina-inicial.css',
})
export class ClientePaginaInicial implements OnInit {
  formataData = formataData
  exibirModal: boolean = false;
  minhasSolicitacoes: Solicitacao[] = [];
  loading = false;
 

  constructor(private solicitacaoService: SolicitacaoService, private toastService: ToastService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.carregarSolicitacoes();
  }

  endLoad = () => {
    setTimeout(() => {
        this.loading = false;
        this.cdr.detectChanges();
      })
  }

  //deixando essa funcao fora do ngoninit para poder chamar ela ao fechar o modal
  carregarSolicitacoes(): void {
    this.loading = true;
    this.solicitacaoService.buscarTodas(-1, false, null, null).subscribe({
      next: (solicitacoes) => {
        this.minhasSolicitacoes = solicitacoes;
       
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao carregar solicitações:', error);
        this.toastService.showError('Erro ao carregar solicitações.');
      },
      complete: () => {
        this.endLoad()
      }
    });

    console.log()
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
