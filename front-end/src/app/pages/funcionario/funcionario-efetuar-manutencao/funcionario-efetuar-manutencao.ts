import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FuncionarioModalRedirecionarManutencao } from '../funcionario-modal-redirecionar-manutencao/funcionario-modal-redirecionar-manutencao';
import { FuncionarioModalEfetuarManutencao } from '../funcionario-modal-efetuar-manutencao/funcionario-modal-efetuar-manutencao';
import { StorageService } from '../../../services/storage-service';
import { Solicitacao } from '../../../models/solicitacao';
import { Usuario } from '../../../models/usuario';
import { ManutencaoService } from '../../../services/manutencao-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-funcionario-efetuar-manutencao',
  imports: [CommonModule, DatePipe, RouterModule, FuncionarioModalRedirecionarManutencao, FuncionarioModalEfetuarManutencao, FormsModule],
  templateUrl: './funcionario-efetuar-manutencao.html',
  styleUrl: './funcionario-efetuar-manutencao.css'
})
export class FuncionarioEfetuarManutencao implements OnInit{

  solicitacao: Solicitacao | undefined;
  cliente: Usuario | undefined;
  
  descricaoManutencao: string | undefined;
  instrucoesCliente: string | undefined;

  private readonly SOLICITACOES_KEY = 'solicitacoes';
  private readonly USUARIOS_KEY = 'usuarios';

  exibirModalRedirecionarManutencao: boolean = false;
  exibirModalEfetuarManutencao: boolean = false;
  
  constructor(private route: ActivatedRoute, private router: Router, private storageService: StorageService, private manutencaoService: ManutencaoService) {}

  ngOnInit(): void {

    const idDaUrl = this.route.snapshot.paramMap.get('id');
    const idNumerico = idDaUrl ? +idDaUrl : 0;
    
    const todasAsSolicitacoes = this.storageService.getDados(this.SOLICITACOES_KEY);
    const todosOsUsuarios = this.storageService.getDados(this.USUARIOS_KEY);

    this.solicitacao = todasAsSolicitacoes.find(
      (s: any) => s.id === idNumerico
    );

    if (this.solicitacao && todosOsUsuarios) {
        this.solicitacao.dataHora = new Date(this.solicitacao.dataHora).toISOString();

        this.cliente = todosOsUsuarios.find(
            (u: any) => u.id === this.solicitacao?.clienteId
        );
    }
  }

  efetuarManutencao(): void {
    if (!this.solicitacao || !this.descricaoManutencao || !this.instrucoesCliente) return;

    const atualizado = this.manutencaoService.efetuarManutencao(this.solicitacao.id, this.descricaoManutencao, this.instrucoesCliente);

    if (atualizado) {
      alert('Manutenção efetuada com sucesso!');
      this.router.navigate(['/funcionario/pagina-inicial']); 
    }
  }
  

  abrirModalRedirecionarManutencao(): void {
    this.exibirModalRedirecionarManutencao = true;
  }

  fecharModalRedirecionarManutencao(): void {
    this.exibirModalRedirecionarManutencao = false;
  }
}
