import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { LoadingOverlayComponent } from '../../../shared/loading-overlay.component';
import { Solicitacao } from '../../../models/solicitacao';
import { UsuarioService } from '../../../services/usuario-service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SolicitacaoService } from '../../../services/solicitacao-service';
import { HttpErrorResponse } from '@angular/common/http';
import { APIResponse } from '../../../../api/api';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { EstadosSolicitacao } from '../../../models/enums/estados-solicitacao';

@Component({
  selector: 'app-funcionario-modal-efetuar-manutencao',
  imports: [FormsModule, CommonModule, LoadingOverlayComponent, ToastrModule],
  templateUrl: './funcionario-modal-efetuar-manutencao.html',
  styleUrl: './funcionario-modal-efetuar-manutencao.css'
})
export class FuncionarioModalEfetuarManutencao implements OnInit {

  loading = false;
  redirecionando = false;
  funcionarios: Usuario[] = [];
  funcionarioDestino: Usuario | null = null;
  solicitacao: Solicitacao | null = null;

  @Output() fecharModalEfetuarManutencao: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private userService: UsuarioService,
    private solicitacaoService: SolicitacaoService,
    private cdr: ChangeDetectorRef,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const idDaUrl = this.route.snapshot.paramMap.get('id');
    this.loading = true;
    if (isNaN(parseInt(idDaUrl ?? "oiprofessor"))) { // qualquer valor nao numerico só pra dar false
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

    this.userService.buscarFuncionarios().subscribe({
      next: (res) => this.funcionarios = res.body,
      error: (err: HttpErrorResponse & { error: APIResponse<any> }) => {
        this.toastrService.error(err.error.message)
      }
    })
  }

  onCancelar(): void {
    this.fecharModalEfetuarManutencao.emit();
  }

  redirecionar() {
      if (!this.redirecionando || !this.funcionarioDestino || this.solicitacao) {
        return
      }
      this.loading = true;
      this.solicitacaoService.atualizarSolicitacao(this.solicitacao!.id, { status: EstadosSolicitacao.REDIRECIONADA, responsavel_id: this.funcionarioDestino.id })
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
            this.solicitacao!.responsavel = this.funcionarioDestino;
            this.solicitacao!.status = EstadosSolicitacao.REDIRECIONADA;
          },
          error: (err: HttpErrorResponse & { error: APIResponse<any> }) => {
            this.toastrService.error(err.error.message)
          },
        })
    }


}
