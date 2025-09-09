import { Component, OnInit } from '@angular/core';
import {CurrencyPipe, DatePipe, NgIf} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteAprovarServico } from '../cliente-aprovar-servico/cliente-aprovar-servico';
import { ClienteRejeitarServico } from '../cliente-rejeitar-servico/cliente-rejeitar-servico';

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

  private todasAsSolicitacoes = [
    {
      id: 1,
      dataHora: new Date('2025-03-01T10:00:00'),
      descricaoEquipamento: 'Notebook Dell',
      categoria: 'Notebook',
      defeito: 'Tela fica piscando intermitentemente, especialmente ao mover a tampa.',
      status: 'ORÇADA',
      preco: 450.00,
      cliente: {
        nome: 'João da Silva',
        contato: '(41) 91234-5678',
        email: 'joao.silva@gmail.com'
      }
    },
    {
      id: 4,
      dataHora: new Date('2025-03-12T16:45:00'),
      descricaoEquipamento: 'Desktop 2025',
      categoria: 'Desktop',
      defeito: 'O computador está muito lento e travando, mesmo após formatação.',
      status: 'ORÇADA',
      preco: 300.00,
      cliente: {
        nome: 'Joana da Silva',
        contato: '(41) 98765-4321',
        email: 'joana.silva@gmail.com'
      }
    }
  ];

  exibirModalAprovarServico: boolean = false;
  exibirModalRejeitarServico: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const idDaUrl = this.route.snapshot.paramMap.get('id');
    const idNumerico = idDaUrl ? +idDaUrl : 0;
    this.solicitacao = this.todasAsSolicitacoes.find(s => s.id === idNumerico);
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
