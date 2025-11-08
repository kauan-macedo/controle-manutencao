import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClienteCriarSolicitacao } from '../cliente-criar-solicitacao/cliente-criar-solicitacao';
import { Solicitacao } from '../../../models/solicitacao';
import { SolicitacaoService } from '../../../services/solicitacao-service';
import { EstadosSolicitacao, translateEstado ,} from '../../../models/enums/estados-solicitacao';
import { getClasseEstado} from '../../../utils/utils';
import { formataData } from '../../../utils/utils';
import { LoadingOverlayComponent } from '../../../shared/loading-overlay.component';
import { ModalResgatarServicoComponent } from '../../../shared/modal/modal-resgatar-servico/modal-resgatar-servico';
import { HttpErrorResponse } from '@angular/common/http';
import { APIResponse } from '../../../../api/api';
import {ToastContainerDirective, ToastrModule, ToastrService} from 'ngx-toastr';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-cliente-pagina-inicial',
  imports: [
    ClienteCriarSolicitacao,
    CommonModule,
    RouterModule,
    ToastrModule,
    LoadingOverlayComponent,
    ModalResgatarServicoComponent
  ],
  templateUrl: './cliente-pagina-inicial.html',
  styleUrl: './cliente-pagina-inicial.css',
})
export class ClientePaginaInicial implements OnInit {
  formataData = formataData
  exibirModal: boolean = false;
  minhasSolicitacoes: Solicitacao[] = [];
  loading = false;

  solicitacaoParaResgatar: Solicitacao | null = null;


  constructor(
    private solicitacaoService: SolicitacaoService,
    private toastService: ToastrService,
    private cdr: ChangeDetectorRef,
    private toastrService: ToastrService
  ){}

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
    this.solicitacaoService.buscarTodas(null, false, null, null)
      .pipe(finalize(() => this.endLoad()))
      .subscribe({
        next: (solicitacoes) => {
          this.minhasSolicitacoes = solicitacoes;
          this.cdr.detectChanges();
        },
        error: (err: HttpErrorResponse & { error: APIResponse<any> }) => {
          this.toastService.error(err.error.message);
        }
      });

    console.log()
  }

  abrirModal(): void {
    this.exibirModal = true;
  }

  fecharModal(): void {
    this.exibirModal = false;
  }

  traduzirEstado(estd: EstadosSolicitacao): string {
    return translateEstado(estd);
  }

  abrirModalResgatar(solicitacao: Solicitacao): void {
    this.solicitacaoParaResgatar = solicitacao;
  }

  handleCancelResgate(): void {
    setTimeout(() => {
      this.solicitacaoParaResgatar = null;
    });
  }

  protected readonly getClasseEstado = getClasseEstado;

  handleConfirmResgate(solicitacao: Solicitacao): void {
    this.loading = true;
    this.solicitacaoService.atualizarSolicitacao(solicitacao.id, { status: EstadosSolicitacao.APROVADA })
      .subscribe({
        next: (res: APIResponse<any>) => {
          this.toastService.success('Serviço resgatado com sucesso!');

          this.handleCancelResgate();
          setTimeout(() => this.carregarSolicitacoes(), 100);
        },
        error: (err: HttpErrorResponse & { error: APIResponse<any> }) => {
          this.toastService.error(err.error.message);
          this.endLoad();
          this.handleCancelResgate();
        }
      });
  }
}
