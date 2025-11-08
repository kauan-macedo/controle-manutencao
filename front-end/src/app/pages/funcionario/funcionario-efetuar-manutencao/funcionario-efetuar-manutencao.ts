import { CommonModule, DatePipe } from '@angular/common';
import {ChangeDetectorRef, Component, EventEmitter, NgZone, OnInit, Output} from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Solicitacao } from '../../../models/solicitacao';
import { FormsModule } from '@angular/forms';
import {finalize} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {APIResponse} from '../../../../api/api';
import {SolicitacaoService} from '../../../services/solicitacao-service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {EstadosSolicitacao, translateEstado} from '../../../models/enums/estados-solicitacao';
import {formataData, getClasseEstado} from '../../../utils/utils';
import {LoadingOverlayComponent} from '../../../shared/loading-overlay.component';
import { ModalRedirecionarSolicitacao } from '../../../shared/modal/modal-redirecionar-solicitacao/modal-redirecionar-solicitacao';

@Component({
  selector: 'app-funcionario-efetuar-manutencao',
  imports: [CommonModule, DatePipe, RouterModule, FormsModule, ToastrModule, LoadingOverlayComponent, ModalRedirecionarSolicitacao],
  templateUrl: './funcionario-efetuar-manutencao.html',
  styleUrl: './funcionario-efetuar-manutencao.css'
})
export class FuncionarioEfetuarManutencao implements OnInit{

  formataData = formataData
  getClasseEstado = getClasseEstado
  translateEstado = translateEstado;

  loading = false;
  redirecionando = false;
  solicitacao: Solicitacao | null = null;
  descricaoManutencao = "";
  instrucoesCliente = "";

  @Output() fecharModalEfetuarManutencao: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private solicitacaoService: SolicitacaoService,
    private cdr: ChangeDetectorRef,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    const idDaUrl = this.route.snapshot.paramMap.get('id');
    this.loading = true;
    if (isNaN(parseInt(idDaUrl??''))) { // qualquer valor nao numerico só pra dar false
      this.router.navigate(['/funcionario/pagina-inicial'])
    }
    this.solicitacaoService.buscarPorId(parseInt(idDaUrl!))
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this.loading = false;
            this.cdr.detectChanges();
          }, 10);
        })
      )
      .subscribe({
        next: (value) => {
          this.solicitacao = value
        },
        error: (err: HttpErrorResponse & { error: APIResponse<any> }) => {
          this.toastrService.error(err.error.message)
        }
      });
  }

  submit(): void {
    if(!this.solicitacao) {
      return;
    }
    this.loading = true;
    this.solicitacaoService.atualizarSolicitacao(this.solicitacao.id, { status: EstadosSolicitacao.ARRUMADA }).pipe(
      finalize(() => {
        setTimeout(() => {
          this.loading = false;
          this.redirecionando = false;
          this.cdr.detectChanges();
        }, 10);
      })
    )
      .subscribe({
        next: (res) => {
          this.toastrService.success(res.message);
          this.solicitacao!.status = EstadosSolicitacao.ARRUMADA;
          setTimeout(() => {
            this.ngZone.run(() => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/funcionario/apresentar-solicitacoes']);
              });
            });
          }, 3000)
        },
        error: (err: HttpErrorResponse & { error: APIResponse<any> }) => {
          this.toastrService.error(err.error.message)
        },
      })

  }

}
