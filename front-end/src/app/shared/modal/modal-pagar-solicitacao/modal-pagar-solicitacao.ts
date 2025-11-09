import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, output, Output} from '@angular/core';
import {ModalRedirecionarSolicitacao} from "../modal-redirecionar-solicitacao/modal-redirecionar-solicitacao";
import {Solicitacao} from '../../../models/solicitacao';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SolicitacaoService} from '../../../services/solicitacao-service';
import {EstadosSolicitacao, translateEstado} from '../../../models/enums/estados-solicitacao';
import {finalize} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {APIResponse} from '../../../../api/api';
import {formataData, getClasseEstado} from '../../../utils/utils';
import {LoadingOverlayComponent} from '../../loading-overlay.component';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-modal-pagar-solicitacao',
    imports: [
      ModalRedirecionarSolicitacao,
      LoadingOverlayComponent,
      NgClass
    ],
  templateUrl: './modal-pagar-solicitacao.html',
  styleUrl: './modal-pagar-solicitacao.css'
})
export class ModalPagarSolicitacao implements OnInit {
  formataData = formataData
  getClasseEstado = getClasseEstado
  translateEstado = translateEstado;

  loading = false;
  redirecionando = false;

  @Input() solicitacao: Solicitacao | null = null;
  @Output() closed = new EventEmitter<void>();

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private solicitacaoService: SolicitacaoService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  endLoad = () => {
    setTimeout(() => {
      this.loading = false;
      this.cdr.detectChanges();
    })
  }

  close() {
    this.closed.emit();
  }

  confirmar() {
    if(!this.solicitacao) {
      return;
    }
    this.loading = true;
    this.solicitacaoService.atualizarSolicitacao(this.solicitacao.id, { status: EstadosSolicitacao.PAGA })
      .pipe(finalize(() => this.endLoad()))
      .subscribe({
        next: (res) => {
          this.toastrService.success(res.message);
          if(this.solicitacao) {
            this.solicitacao.status = EstadosSolicitacao.PAGA;
          }
          this.closed.emit();
        },
        error: (err: HttpErrorResponse & { error: APIResponse<any> }) => {
          this.toastrService.error(err.error.message);
        },
      });
  }

}
