import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Solicitacao } from '../../../models/solicitacao';
import { formataData, getClasseEstado } from '../../../utils/utils';
import { EstadosSolicitacao, translateEstado } from '../../../models/enums/estados-solicitacao';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario-service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { APIResponse } from '../../../../api/api';
import { FormsModule } from '@angular/forms';
import { SolicitacaoService } from '../../../services/solicitacao-service';
import { finalize, map } from 'rxjs';

@Component({
  selector: 'app-modal-visualizar-solicitacao',
  imports: [
    NgClass,
    FormsModule,
    ToastrModule
  ],
  templateUrl: './modal-visualizar-solicitacao.html',
  styleUrl: './modal-visualizar-solicitacao.css'
})
export class ModalVisualizarSolicitacao implements OnInit {
  formataData = formataData
  getClasseEstado = getClasseEstado
  translateEstado = translateEstado;

  loading = false;
  redirecionando = false;
  funcionarioDestino: Usuario | null = null;
  funcionariosDisponiveis: Usuario[] = [];

  @Input() solicitacao: Solicitacao | null = null;
  @Output() closed = new EventEmitter<void>();

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private toastrService: ToastrService,
    private solicitacaoService: SolicitacaoService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  redirecionar() {}

  close() {
    this.solicitacao = null;
    this.closed.emit();
  }

  orcar() {
    if (!this.solicitacao) {
      return;
    }
    this.router.navigate(['/funcionario/efetuar-orcamento', this.solicitacao.id]);
  }

  finalizar() {
    if(!this.solicitacao) {
      return;
    }
    this.solicitacaoService.atualizarSolicitacao(this.solicitacao!.id, { status: EstadosSolicitacao.FINALIZADA })
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this.loading = false;
            this.cdr.detectChanges();
          }, 10);
        })
      )
      .subscribe({
        next: (res) => {
          this.toastrService.success(res.message);
          this.solicitacao!.status = EstadosSolicitacao.FINALIZADA;
        },
        error: (err: HttpErrorResponse & { error: APIResponse<any> }) => {
          this.toastrService.error(err.error.message)
        },
      })
  }

  arrumar() {
    if (!this.solicitacao) {
      return;
    }
    this.router.navigate(['/funcionario/efetuar-manutencao', this.solicitacao.id]);
  }

}
