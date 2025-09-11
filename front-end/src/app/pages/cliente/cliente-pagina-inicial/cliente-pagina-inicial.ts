import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClienteCriarSolicitacao } from '../cliente-criar-solicitacao/cliente-criar-solicitacao';


@Component({
  selector: 'app-cliente-pagina-inicial',
  imports: [ ClienteCriarSolicitacao, CommonModule, RouterModule ],
  templateUrl: './cliente-pagina-inicial.html',
  styleUrl: './cliente-pagina-inicial.css'
})

export class ClientePaginaInicial {

  minhasSolicitacoes = [
    {
      id: 1,
      dataHora: new Date('2025-01-01T08:00:00'),
      cliente: 'Ana Almeida',
      produto: 'Notebook Acer Aspire 5',
      status: 'Arrumada',
      acao: 'Pagar'
    },
    {
      id: 2,
      dataHora: new Date('2025-01-01T09:15:00'),
      cliente: 'Bruno Barbosa',
      produto: 'Smartphone Motorola Edge 50',
      status: 'Finalizada',
      acao: null
    },
    {
      id: 3,
      dataHora: new Date('2025-01-01T10:30:00'),
      cliente: 'Carla Cunha Cavalcanti',
      produto: 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
      status: 'Orçada',
      acao: 'Aprovar/Rejeitar'
    },
    {
      id: 4,
      dataHora: new Date('2025-01-01T11:45:00'),
      cliente: 'Diego Dias',
      produto: 'Roteador TP-Link AX1800',
      status: 'Rejeitada',
      acao: 'Resgatar Serviço'
    },
    {
      id: 5,
      dataHora: new Date('2025-01-01T13:00:00'),
      cliente: 'Elisa Esteves',
      produto: 'Monitor LG Ultrawide 29"',
      status: 'Orçada',
      acao: 'Aprovar/Rejeitar'
    },
    {
      id: 11,
      dataHora: new Date('2025-01-01T08:00:00'),
      cliente: 'Ana Almeida',
      produto: 'Notebook Acer Aspire 5',
      status: 'Arrumada',
      acao: 'Pagar'
    },
    {
      id: 21,
      dataHora: new Date('2025-01-01T09:15:00'),
      cliente: 'Bruno Barbosa',
      produto: 'Smartphone Motorola Edge 50',
      status: 'Finalizada',
      acao: null
    },
    {
      id: 31,
      dataHora: new Date('2025-01-01T10:30:00'),
      cliente: 'Carla Cunha Cavalcanti',
      produto: 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
      status: 'Orçada',
      acao: 'Aprovar/Rejeitar'
    },
    {
      id: 41,
      dataHora: new Date('2025-01-01T11:45:00'),
      cliente: 'Diego Dias',
      produto: 'Roteador TP-Link AX1800',
      status: 'Rejeitada',
      acao: 'Resgatar Serviço'
    },
    {
      id: 51,
      dataHora: new Date('2025-01-01T13:00:00'),
      cliente: 'Elisa Esteves',
      produto: 'Monitor LG Ultrawide 29"',
      status: 'Orçada',
      acao: 'Aprovar/Rejeitar'
    }
  ];

  //adicionando funcao para exibir o componente de criar solicitacao na pagina inicial
  exibirModal: boolean = false;

  abrirModal(): void {
    this.exibirModal = true;
  }

  fecharModal(): void {
    this.exibirModal = false;
  }
}
