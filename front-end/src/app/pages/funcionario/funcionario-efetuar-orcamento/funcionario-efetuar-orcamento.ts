import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-funcionario-efetuar-orcamento',
  imports: [CommonModule, DatePipe, RouterModule],
  templateUrl: './funcionario-efetuar-orcamento.html',
  styleUrl: './funcionario-efetuar-orcamento.css'
})
export class FuncionarioEfetuarOrcamento {

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
          telefone: '(41) 91234-5678',
          email: 'joao.silva@gmail.com',
          endereco: 'Rua Julia Ohpis, 467'
        }
      },
      {
        id: 4,
        dataHora: new Date('2025-03-12T16:45:00'),
        descricaoEquipamento: 'Desktop 2025',
        categoria: 'Desktop',
        defeito: 'O computador está muito lento e travando, mesmo após formatação. O computador está muito lento e travando, mesmo após formatação. O computador está muito lento e travando, mesmo após formatação. O computador está muito lento e travando, mesmo após formatação.',
        status: 'ORÇADA',
        preco: 300.00,
        cliente: {
          nome: 'Joana da Silva',
          telefone: '(41) 98765-4321',
          email: 'joana.silva@gmail.com',
          endereco: 'Rua dos Bobos, 0'
        }
      }
    ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {

    const idDaUrl = this.route.snapshot.paramMap.get('id');
    const idNumerico = idDaUrl ? +idDaUrl : 0;
    this.solicitacao = this.todasAsSolicitacoes.find(s => s.id === idNumerico);
  }

}
