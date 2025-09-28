import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StorageService } from '../../../services/storage-service';
import { Solicitacao } from '../../../models/solicitacao';
import { Usuario } from '../../../models/usuario';
import { OrcamentoService } from '../../../services/orcamento-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-funcionario-efetuar-orcamento',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterModule, FormsModule],
  templateUrl: './funcionario-efetuar-orcamento.html',
  styleUrl: './funcionario-efetuar-orcamento.css'
})
export class FuncionarioEfetuarOrcamento implements OnInit {

  solicitacao: Solicitacao | undefined;
  cliente: Usuario | undefined;
  valorOrcamento: number | undefined;


  private readonly SOLICITACOES_KEY = 'solicitacoes';
  private readonly USUARIOS_KEY = 'usuarios';

  constructor(private route: ActivatedRoute, private router: Router, private storageService: StorageService, private orcamentoService: OrcamentoService) {}

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

  efetuarOrcamento(): void {
    if (!this.solicitacao || !this.valorOrcamento) return;

    const atualizado = this.orcamentoService.efetuarOrcamento(this.solicitacao.id, this.valorOrcamento);

    if (atualizado) {
      alert('Orçamento efetuado com sucesso!');
      this.router.navigate(['/funcionario']); // redireciona
    }
  }

}