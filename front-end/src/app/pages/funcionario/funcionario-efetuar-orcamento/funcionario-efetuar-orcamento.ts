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


  constructor(private route: ActivatedRoute, private router: Router, private orcamentoService: OrcamentoService, private solicitacaoService: SolicitacaoService, private cdr: ChangeDetectorRef) {}

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

    efetuarOrcamento(): void {}

  }

  