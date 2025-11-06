import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteAprovarServico } from '../cliente-aprovar-servico/cliente-aprovar-servico';
import { ClienteRejeitarServico } from '../cliente-rejeitar-servico/cliente-rejeitar-servico';
import { Usuario } from '../../../models/usuario';
import { SolicitacaoService } from '../../../services/solicitacao-service';
import { SpinnerComponent } from '../../../shared/loading-spinner/spinner';

@Component({
  selector: 'app-cliente-mostrar-orcamento',
  imports: [
    DatePipe,
    CurrencyPipe,
    ClienteAprovarServico,
    ClienteRejeitarServico,
    SpinnerComponent
  ],
  templateUrl: './cliente-mostrar-orcamento.html',
  styleUrls: ['./cliente-mostrar-orcamento.css']
})
export class ClienteMostrarOrcamento implements OnInit {

  isLoading: boolean = false;
  solicitacao: any;


  exibirModalAprovarServico: boolean = false;
  exibirModalRejeitarServico: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private solicitacaoService: SolicitacaoService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    const idDaUrl = this.route.snapshot.paramMap.get('id');

    //garantindo que o idDaUrl não é nulo
    if (!idDaUrl) {
      console.error('ID da solicitação não encontrado na URL');
      return;
    }

    const idNumerico = +idDaUrl;
    
    this.buscarPorId(idNumerico);

    //garantindo que o template vai ser carregado quando a requisicao for feita
    this.cdr.detectChanges();
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

  aprovarSolicitacao(): void {
    if (this.solicitacao) {
      this.fecharModalAprovarServico();
      this.router.navigate(['/cliente/pagina-inicial']);
    }
  }

 
  rejeitarSolicitacao(): void {
    if (this.solicitacao) {
      this.fecharModalRejeitarServico();
      this.router.navigate(['/cliente/pagina-inicial']);
    }
  }

  abrirModalAprovarServico(): void {
    this.exibirModalAprovarServico = true;
  }

  fecharModalAprovarServico(): void {
    this.exibirModalAprovarServico = false;
  }

  abrirModalRejeitarServico(): void {
    this.exibirModalRejeitarServico = true;
  }

  fecharModalRejeitarServico(): void {
    this.exibirModalRejeitarServico = false;
  }
}
