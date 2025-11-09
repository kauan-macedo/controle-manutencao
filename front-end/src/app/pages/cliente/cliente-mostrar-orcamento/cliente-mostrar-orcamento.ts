import { Solicitacao } from '../../../models/solicitacao';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {CurrencyPipe, DatePipe, NgClass, NgIf} from '@angular/common';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { ClienteAprovarServico } from '../cliente-aprovar-servico/cliente-aprovar-servico';
import { ClienteRejeitarServico } from '../cliente-rejeitar-servico/cliente-rejeitar-servico';
import { SolicitacaoService } from '../../../services/solicitacao-service';
import {EstadosSolicitacao, translateEstado} from '../../../models/enums/estados-solicitacao';
import { LoadingOverlayComponent } from '../../../shared/loading-overlay.component';
import {finalize} from 'rxjs';
import {formataData, getClasseEstado} from '../../../utils/utils';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';
import {APIResponse} from '../../../../api/api';

@Component({
  selector: 'app-cliente-mostrar-orcamento',
  imports: [
    DatePipe,
    CurrencyPipe,
    ClienteAprovarServico,
    ClienteRejeitarServico,
    LoadingOverlayComponent,
    NgClass,
    ToastrModule,
    RouterModule
  ],
  templateUrl: './cliente-mostrar-orcamento.html',
  styleUrls: ['./cliente-mostrar-orcamento.css']
})
export class ClienteMostrarOrcamento implements OnInit {


  solicitacao: Solicitacao | null = null;
  exibirModalAprovarServico: boolean = false;
  exibirModalRejeitarServico: boolean = false;
  formataData = formataData
  getClasseEstado = getClasseEstado
  translateEstado = translateEstado
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private solicitacaoService: SolicitacaoService,
    private cdr: ChangeDetectorRef,
    private toastService: ToastrService
  ) {}

  async ngOnInit(): Promise<void> {
    const idDaUrl = this.route.snapshot.paramMap.get('id');

    //garantindo que o idDaUrl não é nulo
    if (!idDaUrl) {
      console.error('ID da solicitação não encontrado na URL');
      return;
    }

    const idNumerico = +idDaUrl;

    this.buscarPorId(idNumerico);

    //garantindo que o template vai ser carregado quando a requisicao for feita
    this.cdr.detectChanges();
  }

  endLoad = () => {
    setTimeout(() => {
      this.loading = false;
      this.cdr.detectChanges();
    })
  }

  buscarPorId(id: number): void {
    this.loading = true;
    this.solicitacaoService.buscarPorId(id)
      .pipe(finalize(() => this.endLoad()))
      .subscribe({
        next: (data) => {
          this.solicitacao = data;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Erro ao carregar solicitações:', error);
        }
      });
  }

  aprovarSolicitacao(): void {
    if (this.solicitacao) {
      this.loading = true;
      this.solicitacaoService.atualizarSolicitacao(this.solicitacao.id, { status: EstadosSolicitacao.APROVADA })
        .pipe(finalize(() => this.endLoad()))
        .subscribe({
          next: () => {
            this.toastService.success("Serviço Aprovado no Valor R$" + this.solicitacao!.orcamento!.valor.toFixed(2) + "");
            this.fecharModalAprovarServico();
            this.router.navigate(['/cliente/pagina-inicial']);
          },
          error: (err: HttpErrorResponse & { error: APIResponse<any> }) => {
            this.toastService.error(err.error.message);
          }
        });
    }
  }


  rejeitarSolicitacao(): void {
    if (this.solicitacao) {
      this.loading = true;
      this.solicitacaoService.atualizarSolicitacao(this.solicitacao.id, { status: EstadosSolicitacao.REJEITADA })
        .pipe(finalize(() => this.endLoad()))
        .subscribe({
          next: (res) => {
            this.toastService.success("Serviço rejeitado.");
            this.fecharModalRejeitarServico();
            this.router.navigate(['/cliente/pagina-inicial']);
          },
          error: (err: HttpErrorResponse & { error: APIResponse<any> }) => {
            this.toastService.error(err.error.message);
          }
        });
    }
  }

  abrirModalAprovarServico(): void {
    this.exibirModalAprovarServico = true;
  }

  fecharModalAprovarServico(): void {
    this.exibirModalAprovarServico = false;
  }

  abrirModalRejeitarServico(): void {
    this.exibirModalRejeitarServico = true;
  }

  fecharModalRejeitarServico(): void {
    this.exibirModalRejeitarServico = false;
  }
}
