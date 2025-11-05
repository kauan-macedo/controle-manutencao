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

@Component({
  selector: 'app-funcionario-efetuar-orcamento',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SpinnerComponent],
  templateUrl: './funcionario-efetuar-orcamento.html',
  styleUrl: './funcionario-efetuar-orcamento.css'
})
export class FuncionarioEfetuarOrcamento implements OnInit {

  solicitacao: Solicitacao | null = null;
  cliente: Usuario | undefined;
  valorOrcamento: number | undefined;
  descricaoOrcamento: string | undefined;
  isLoading: boolean = false;


  constructor(private route: ActivatedRoute, private router: Router, private orcamentoService: OrcamentoService, private solicitacaoService: SolicitacaoService, private cdr: ChangeDetectorRef, private toastService: ToastService) {}

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
      this.toastService.showError('Solicitação não carregada.');
      return;
    }
    if (!this.valorOrcamento || !this.descricaoOrcamento) {
        this.toastService.showError('Preencha todos os campos do orçamento.');
        return;
    }

    this.isLoading = true;
    this.orcamentoService.enviarOrcamento(solicitacao.id, this.valorOrcamento, this.descricaoOrcamento)
        .subscribe({
            next: (response) => {
                this.isLoading = false;
                this.toastService.showSuccess(response.message);
                this.router.navigate(['/funcionario/solicitacao', solicitacao.id]);
            },
            error: (error) => {
                this.isLoading = false;
                this.toastService.showError(error.message);
            }
        });
  }
}