import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Solicitacao } from '../../../models/solicitacao';
import { Usuario } from '../../../models/usuario';
import { OrcamentoService } from '../../../services/orcamento-service';
import { FormsModule } from '@angular/forms';
import { SolicitacaoService } from '../../../services/solicitacao-service';
import { EstadosSolicitacao, translateEstado } from '../../../models/enums/estados-solicitacao';
import { MaskDirective } from '../../../shared/directives/mask.directive';
import { formataData, getClasseEstado } from '../../../utils/utils';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LoadingOverlayComponent } from '../../../shared/loading-overlay.component';
import { finalize } from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {APIResponse} from '../../../../api/api';

@Component({
  selector: 'app-funcionario-efetuar-orcamento',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MaskDirective, ToastrModule, LoadingOverlayComponent],
  templateUrl: './funcionario-efetuar-orcamento.html',
  styleUrl: './funcionario-efetuar-orcamento.css'
})
export class FuncionarioEfetuarOrcamento implements OnInit {
  getClasseEstado = getClasseEstado
  translateEstado = translateEstado
  formataData = formataData
  solicitacao: Solicitacao | null = null;
  cliente: Usuario | undefined;
  valorOrcamento: string | undefined;
  descricaoOrcamento: string | undefined;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orcamentoService: OrcamentoService,
    private solicitacaoService: SolicitacaoService,
    private cdr: ChangeDetectorRef,
    private toastrService: ToastrService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    const idDaUrl = this.route.snapshot.paramMap.get('id');

    if (!idDaUrl) {
      console.error('ID da solicitação não encontrado na URL');
      return;
    }

    const idNumerico = +idDaUrl;

    this.buscarPorId(idNumerico);

    this.cdr.detectChanges();
  }

  endLoad = () => {
    setTimeout(() => {
        this.loading = false;
        this.cdr.detectChanges();
      })
  }

  traduzirEstado(estd: EstadosSolicitacao): string {
    return translateEstado(estd);
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
        this.endLoad();
      }
    });
  }

  efetuarOrcamento(): void {
    const solicitacao = this.solicitacao;
    if (!solicitacao) {
      this.toastrService.error('Solicitação não carregada.');
      return;
    }
    if (!this.valorOrcamento) {
        this.toastrService.error('Preencha todos os campos do orçamento.');
        return;
    }

    this.loading = true;

    debugger
    let valor = this.valorOrcamento
      .replace(/[^\d,.,-]/g, '')
      .replace(/\./g, '')
      .replace(',', '.');

    if (valor.endsWith('-')) {
      valor = valor.slice(0, -1);
    }

    this.orcamentoService.enviarOrcamento(solicitacao.id, parseFloat(valor)*10)
      .pipe(finalize(() => this.endLoad()))
        .subscribe({
            next: (response) => {
                this.toastrService.success(response.message);
                setTimeout(() => {
                  this.ngZone.run(() => {
                    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                      this.router.navigate(['/funcionario/pagina-inicial']);
                    });
                  });
                }, 3000)
            },
            error: (err: HttpErrorResponse & { error: APIResponse<any> }) => {
              this.toastrService.error(err.error.message);
              this.endLoad();
            }
        });
  }
}
