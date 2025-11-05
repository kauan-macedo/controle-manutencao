import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Solicitacao } from '../../../models/solicitacao';
import { Usuario } from '../../../models/usuario';
import { OrcamentoService } from '../../../services/orcamento-service';
import { FormsModule } from '@angular/forms';
import { SolicitacaoService } from '../../../services/solicitacao-service';
import { SpinnerComponent } from '../../../shared/loading-spinner/spinner';
import { EstadosSolicitacao, translateEstado } from '../../../models/enums/estados-solicitacao';
import { ToastService } from '../../../services/toast-service';
import { MaskDirective } from '../../../shared/directives/mask.directive';
import { formataData } from '../../../utils/utils';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LoadingOverlayComponent } from '../../../shared/loading-overlay.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-funcionario-efetuar-orcamento',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MaskDirective, ToastrModule, LoadingOverlayComponent],
  templateUrl: './funcionario-efetuar-orcamento.html',
  styleUrl: './funcionario-efetuar-orcamento.css'
})
export class FuncionarioEfetuarOrcamento implements OnInit {
  formataData = formataData
  solicitacao: Solicitacao | null = null;
  cliente: Usuario | undefined;
  valorOrcamento: string | undefined;
  descricaoOrcamento: string | undefined;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private orcamentoService: OrcamentoService, 
    private solicitacaoService: SolicitacaoService,
    private cdr: ChangeDetectorRef, 
    private toastrService: ToastrService
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

  traduzirEstado(estd: EstadosSolicitacao): string {
    return translateEstado(estd);
  }

  buscarPorId(id: number): void {
    this.isLoading = true;
    this.solicitacaoService.buscarPorId(id).subscribe({
      next: (data) => {
        this.solicitacao = data;
        this.isLoading = false;
        this.cdr.detectChanges(); 
      },
      error: (error) => {
        console.error('Erro ao carregar solicitações:', error);
      },
    });
  }

  efetuarOrcamento(): void {
    const solicitacao = this.solicitacao;
    if (!solicitacao) {
      this.toastrService.error('Solicitação não carregada.');
      return;
    }
    if (!this.valorOrcamento || !this.descricaoOrcamento) {
        this.toastrService.error('Preencha todos os campos do orçamento.');
        return;
    }

    this.isLoading = true;
    this.orcamentoService.enviarOrcamento(solicitacao.id, parseFloat(
      this.valorOrcamento
          .replace(/[^\d,.-]/g, '')
          .replace(/\./g, '')     
          .replace(',', '.')
      ), this.descricaoOrcamento).pipe(
              finalize(() => {
                setTimeout(() => {
                  this.isLoading = false;
                  this.cdr.detectChanges();
                }, 10);
              })
            )
        .subscribe({
            next: (response) => {
                this.toastrService.success(response.message);
                setTimeout(() => {
                  debugger
                  this.router.navigate(['/funcionario/solicitacao', solicitacao.id]);
                }, 3000)
            },
            error: (error) => {
                this.toastrService.error(error.message);
            }
        });
  }
}