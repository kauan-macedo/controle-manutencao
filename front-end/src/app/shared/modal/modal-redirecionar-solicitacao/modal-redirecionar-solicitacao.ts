import {ChangeDetectorRef, Component, EventEmitter, Input, NgZone, OnInit, output, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Usuario} from '../../../models/usuario';
import {Solicitacao} from '../../../models/solicitacao';
import {UsuarioService} from '../../../services/usuario-service';
import {SolicitacaoService} from '../../../services/solicitacao-service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs';
import {EstadosSolicitacao} from '../../../models/enums/estados-solicitacao';
import {HttpErrorResponse} from '@angular/common/http';
import {APIResponse} from '../../../../api/api';
import {LoadingOverlayComponent} from '../../loading-overlay.component';

@Component({
  selector: 'app-modal-redirecionar-solicitacao',
  imports: [
    FormsModule,
    LoadingOverlayComponent
  ],
  templateUrl: './modal-redirecionar-solicitacao.html',
  styleUrl: './modal-redirecionar-solicitacao.css'
})
export class ModalRedirecionarSolicitacao implements OnInit{
  loading = false;
  funcionarios: Usuario[] = [];
  funcionarioDestino: Usuario | null = null;

  @Input() redirecionando = false;
  @Input() solicitacao: Solicitacao | null = null;
  onClosed = output<void>();

  constructor(
    private userService: UsuarioService,
    private solicitacaoService: SolicitacaoService,
    private cdr: ChangeDetectorRef,
    private toastrService: ToastrService,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.userService.buscarFuncionarios().subscribe({
      next: (res) => {
        this.funcionarios = res.body
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse & { error: APIResponse<any> }) => {
        this.toastrService.error(err.error.message)
      }
    })
  }

  redirecionar() {
    if (!this.redirecionando || !this.funcionarioDestino || !this.solicitacao) {
      return
    }
    this.loading = true;
    this.solicitacaoService.atualizarSolicitacao(this.solicitacao!.id, { status: EstadosSolicitacao.REDIRECIONADA, responsavel_id: this.funcionarioDestino.id })
      .pipe(
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
          this.solicitacao!.responsavel = this.funcionarioDestino;
          this.solicitacao!.status = EstadosSolicitacao.REDIRECIONADA;
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
