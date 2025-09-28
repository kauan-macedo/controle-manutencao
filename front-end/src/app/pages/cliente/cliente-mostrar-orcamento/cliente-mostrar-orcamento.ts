import { Component, OnInit } from '@angular/core';
import {CurrencyPipe, DatePipe, NgIf} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteAprovarServico } from '../cliente-aprovar-servico/cliente-aprovar-servico';
import { ClienteRejeitarServico } from '../cliente-rejeitar-servico/cliente-rejeitar-servico';
import { StorageService } from '../../../services/storage-service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-cliente-mostrar-orcamento',
  imports: [
    DatePipe,
    CurrencyPipe,
    NgIf,
    ClienteAprovarServico,
    ClienteRejeitarServico
  ],
  templateUrl: './cliente-mostrar-orcamento.html',
  styleUrl: './cliente-mostrar-orcamento.css'
})
export class ClienteMostrarOrcamento implements OnInit {

  solicitacao: any;
  private readonly STORAGE_KEY = 'solicitacoes';

  exibirModalAprovarServico: boolean = false;
  exibirModalRejeitarServico: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private storageService: StorageService) {}

  ngOnInit(): void {
    const idDaUrl = this.route.snapshot.paramMap.get('id');
    const idNumerico = idDaUrl ? +idDaUrl : 0;
    
    const todasAsSolicitacoes = this.storageService.getDados(this.STORAGE_KEY) || [];
    const todosOsUsuarios: Usuario[] = this.storageService.getDados('usuarios') || [];

    const solicitacaoEncontrada = todasAsSolicitacoes.find(
      (s: any) => s.id === idNumerico
    );

    if (!solicitacaoEncontrada) return;

    // Assegura que existe um cliente associado
    const cliente = todosOsUsuarios.find(u => u.id === solicitacaoEncontrada.clienteId);
    solicitacaoEncontrada.cliente = cliente ?? { nome: 'Desconhecido', telefone: '-' } as Usuario;

    this.solicitacao = solicitacaoEncontrada;
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
