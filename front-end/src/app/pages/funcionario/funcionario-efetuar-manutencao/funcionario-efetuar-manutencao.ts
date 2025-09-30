import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FuncionarioModalRedirecionarManutencao } from '../funcionario-modal-redirecionar-manutencao/funcionario-modal-redirecionar-manutencao';
import { FuncionarioModalEfetuarManutencao } from '../funcionario-modal-efetuar-manutencao/funcionario-modal-efetuar-manutencao';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-funcionario-efetuar-manutencao',
  imports: [CommonModule, DatePipe, RouterModule, FuncionarioModalRedirecionarManutencao, FuncionarioModalEfetuarManutencao],
  templateUrl: './funcionario-efetuar-manutencao.html',
  styleUrl: './funcionario-efetuar-manutencao.css'
})
export class FuncionarioEfetuarManutencao {

  descricaoManutencao: string | undefined;
  informacaoCliente: string | undefined;

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

  exibirModalRedirecionarManutencao: boolean = false;
  exibirModalEfetuarManutencao: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {

    const idDaUrl = this.route.snapshot.paramMap.get('id');
    const idNumerico = idDaUrl ? +idDaUrl : 0;
    this.solicitacao = this.todasAsSolicitacoes.find(s => s.id === idNumerico);
  }

  /**
   * 
   * Efetuar Manutenção muda
   * no back o status da solicitação
   * e a retorna, então leva novamente
   * à página inicial do funcionário
   */
  
  /**
   * Service Efetuar Manutenção
   * Chamar
   * Método
   * Efetuar
   * Manutenção
   * do
   * Service
   * Efetuar
   * Manutenção
   * Passando
   * os
   * Parâmetros
   * descricaoManutencao
   * e
   * informacaoCliente
   * Para
   * Atualizar
   * os
   * Respectivos
   * Campos
   * na
   * Solicitação
   * e
   * Salvar
   * no
   * Banco
   * de
   * Dados
   */

  abrirModalRedirecionarManutencao(): void {
    this.exibirModalRedirecionarManutencao = true;
  }

  fecharModalRedirecionarManutencao(): void {
    this.exibirModalRedirecionarManutencao = false;
  }

  abrirModalEfetuarManutencao(): void {
    if(!this.descricaoManutencao || !this.informacaoCliente) return;

    /**
     *const atualizado = this.manutencaoService.efetuarOrcamento(this.solicitacao.id, this.descricaoManutencao, this.informacaoCliente);

      if (atualizado) {
        alert('Manutenção efetuada com sucesso!');
        this.router.navigate(['/funcionario/pagina-inicial']); 
      }
     */
  }

}
