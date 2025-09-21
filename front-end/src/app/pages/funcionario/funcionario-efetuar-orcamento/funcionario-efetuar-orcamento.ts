import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StorageService } from '../../../services/storage-service';
import { Solicitacao } from '../../../models/solicitacao';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-funcionario-efetuar-orcamento',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterModule],
  templateUrl: './funcionario-efetuar-orcamento.html',
  styleUrl: './funcionario-efetuar-orcamento.css'
})
export class FuncionarioEfetuarOrcamento implements OnInit {

  solicitacao: Solicitacao | undefined;
  cliente: Usuario | undefined; // Adicione esta propriedade para o cliente
  private readonly SOLICITACOES_KEY = 'solicitacoes';
  private readonly USUARIOS_KEY = 'usuarios';

  constructor(private route: ActivatedRoute, private router: Router, private storageService: StorageService) {}

  ngOnInit(): void {
    const idDaUrl = this.route.snapshot.paramMap.get('id');
    const idNumerico = idDaUrl ? +idDaUrl : 0;

    const todasAsSolicitacoes = this.storageService.getDados(this.SOLICITACOES_KEY);
    const todosOsUsuarios = this.storageService.getDados(this.USUARIOS_KEY);

    this.solicitacao = todasAsSolicitacoes.find(
      (s: any) => s.id === idNumerico
    );

    if (this.solicitacao && todosOsUsuarios) {
        // Converte a string de data de volta para um objeto Date
        this.solicitacao.dataHora = new Date(this.solicitacao.dataHora).toISOString();

        // Encontra o cliente usando o clienteId da solicitação
        this.cliente = todosOsUsuarios.find(
            (u: any) => u.id === this.solicitacao?.clienteId
        );
    }
  }

}