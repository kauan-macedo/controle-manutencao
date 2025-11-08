import {Component, OnInit, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitacaoService } from '../../../services/solicitacao-service';
import { Solicitacao } from '../../../models/solicitacao';
import { CategoriaEquipamentoService } from '../../../services/categoria-equipamento-service';
import { Categoria } from '../../../models/categoria-equipamento';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {LoadingOverlayComponent} from '../../../shared/loading-overlay.component';
import {finalize} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {APIResponse} from '../../../../api/api';

@Component({
  selector: 'app-cliente-criar-solicitacao',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastrModule, LoadingOverlayComponent],
  templateUrl: './cliente-criar-solicitacao.html',
  styleUrls: ['./cliente-criar-solicitacao.css'] // <- aqui
})
export class ClienteCriarSolicitacao implements OnInit {
  @Output() solicitacaoCriada = new EventEmitter<void>();

  loading = false;
  solicitacao: Solicitacao = new Solicitacao() ;
  categorias!: Categoria[];

  constructor(
    private solicitacaoService: SolicitacaoService,
    private toastService: ToastrService,
    private categoriaService: CategoriaEquipamentoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loading = true;
    this.categoriaService.listarTodas()
      .pipe(finalize(() => this.endLoad()))
      .subscribe({
        next: (data) => {
          this.categorias = data.body;
        },
        error: (err: HttpErrorResponse & { error: APIResponse<any> }) => {
          this.toastService.error(err.error.message);
        }
      });
  }

  endLoad = () => {
    setTimeout(() => {
      this.loading = false;
      this.cdr.detectChanges();
    })
  }

  onSubmit(form: any) {
    if (form.valid) {
      this.loading = true;
      this.solicitacaoService.adicionarSolicitacao(this.solicitacao!)
        .pipe(finalize(() => this.endLoad()))
        .subscribe({
          next: (res) => {
            this.toastService.success(res.message);
            this.solicitacaoCriada.emit();
            form.resetForm();
          },
          error: (err: HttpErrorResponse & { error: APIResponse<any> }) => {
            this.toastService.error(err.error.message);
          }
      });
    }
  }

}
