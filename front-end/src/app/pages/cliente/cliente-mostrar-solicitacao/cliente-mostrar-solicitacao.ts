import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente-mostrar-solicitacao',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cliente-mostrar-solicitacao.html',
  styleUrl: './cliente-mostrar-solicitacao.css'
})
export class ClienteMostrarSolicitacao implements OnInit {

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
      historico: [
        { dataHora: new Date('2025-03-01T10:00:00'), status: 'Solicitação Aberta', descricao: 'Cliente criou a solicitação.', funcionario: null },
        { dataHora: new Date('2025-03-01T16:25:00'), status: 'Orçamento Realizado', descricao: 'Necessária a troca do cabo flat da tela.', funcionario: 'Mário' }
      ]
    },
    {
      id: 2,
      dataHora: new Date('2025-03-03T14:30:00'),
      descricaoEquipamento: 'Impressora de Escritório Modelo X12',
      categoria: 'Impressora',
      defeito: 'Não está puxando o papel da bandeja principal.',
      status: 'ARRUMADA',
      preco: 120.00,
      historico: [
        { dataHora: new Date('2025-03-03T14:30:00'), status: 'Solicitação Aberta', descricao: 'Cliente criou a solicitação.', funcionario: null },
        { dataHora: new Date('2025-03-04T11:00:00'), status: 'Orçamento Realizado', descricao: 'Limpeza e troca dos roletes de tração.', funcionario: 'Maria' },
        { dataHora: new Date('2025-03-04T17:00:00'), status: 'Serviço Aprovado', descricao: 'Cliente aprovou o orçamento.', funcionario: null },
        { dataHora: new Date('2025-03-05T15:10:00'), status: 'Manutenção Realizada', descricao: 'Peças trocadas e equipamento testado.', funcionario: 'Maria' }
      ]
    },
    {
      id: 3,
      dataHora: new Date('2025-03-10T09:15:00'),
      descricaoEquipamento: 'Teclado',
      categoria: 'Teclado',
      defeito: 'A tecla "W" parou de funcionar.',
      status: 'FINALIZADA',
      preco: 85.00,
      historico: [
        { dataHora: new Date('2025-03-10T09:15:00'), status: 'Solicitação Aberta', descricao: 'Cliente criou a solicitação.', funcionario: null },
        { dataHora: new Date('2025-03-11T10:00:00'), status: 'Manutenção Realizada', descricao: 'Switch da tecla foi trocado.', funcionario: 'Mário' }
      ]
    },
    {
      id: 4,
      dataHora: new Date('2025-03-12T16:45:00'),
      descricaoEquipamento: 'Desktop 2025',
      categoria: 'Desktop',
      defeito: 'O computador está muito lento e travando.',
      status: 'ORÇADA',
      preco: 300.00,
      historico: [
        { dataHora: new Date('2025-03-12T16:45:00'), status: 'Solicitação Aberta', descricao: 'Cliente criou a solicitação.', funcionario: null },
        { dataHora: new Date('2025-03-13T14:00:00'), status: 'Orçamento Realizado', descricao: 'Upgrade de memória RAM e formatação com backup.', funcionario: 'Mário' }
      ]
    },
    {
      id: 5,
      dataHora: new Date('2025-03-19T11:20:00'),
      descricaoEquipamento: 'Mouse sem fio',
      categoria: 'Mouse',
      defeito: 'O botão de rolagem (scroll) está falhando.',
      status: 'REJEITADA',
      preco: 75.50,
      motivoRejeicao: 'O valor do conserto ficou acima do esperado. Prefiro comprar um novo.',
      historico: [
        { dataHora: new Date('2025-03-19T11:20:00'), status: 'Solicitação Aberta', descricao: 'Cliente criou a solicitação.', funcionario: null },
        { dataHora: new Date('2025-03-20T09:05:00'), status: 'Orçamento Realizado', descricao: 'Orçamento para troca do sensor de rolagem.', funcionario: 'Maria' },
        { dataHora: new Date('2025-03-20T18:30:00'), status: 'Serviço Rejeitado', descricao: 'Cliente rejeitou o orçamento.', funcionario: null }
      ]
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {

    const idDaUrl = this.route.snapshot.paramMap.get('id');

    const idNumerico = idDaUrl ? +idDaUrl : 0;

    this.solicitacao = this.todasAsSolicitacoes.find(s => s.id === idNumerico);
  }
}
