import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-funcionario-apresentar-solicitacoes',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe, FormsModule],
  templateUrl: './funcionario-apresentar-solicitacoes.html',
  styleUrl: './funcionario-apresentar-solicitacoes.css'
})  
export class FuncionarioApresentarSolicitacoes implements OnInit{

  dropdown: string[] = ['Todas', 'Hoje', 'Selecionar Período:'];

  filtroSelecionado: string = '';

  dataInicial: string = '';
  dataFinal: string = '';

  solicitacoesAbertas = [
    {
      id: 1,
      dataHora: new Date('2025-01-01T08:00:00'),
      cliente: 'Ana Almeida',
      produto: 'Notebook Acer Aspire 5',
      acao: 'Efetuar Orçamento'
    },
    {
      id: 2,
      dataHora: new Date('2025-01-01T09:15:00'),
      cliente: 'Bruno Barbosa',
      produto: 'Smartphone Motorola Edge 50',
      acao: 'Efetuar Orçamento'
    },
    {
      id: 3,
      dataHora: new Date('2025-01-01T10:30:00'),
      cliente: 'Carla Cunha Cavalcanti',
      produto: 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
      acao: 'Efetuar Orçamento'
    },
    {
      id: 4,
      dataHora: new Date('2025-01-01T11:45:00'),
      cliente: 'Diego Dias',
      produto: 'Roteador TP-Link AX1800',
      acao: 'Efetuar Orçamento'
    },
    {
      id: 5,
      dataHora: new Date('2025-01-01T13:00:00'),
      cliente: 'Elisa Esteves',
      produto: 'Monitor LG Ultrawide 29"',
      acao: 'Efetuar Orçamento'
    },
    {
      id: 6,
      dataHora: new Date('2025-01-01T14:15:00'),
      cliente: 'Felipe Fernandes',
      produto: 'Teclado Mecânico Logitech',
      acao: 'Efetuar Orçamento'
    },
    {
      id: 7,
      dataHora: new Date('2025-01-01T15:30:00'),
      cliente: 'Gabriela Gomes',
      produto: 'Monitor AOC 29"',
      acao: 'Efetuar Orçamento'
    },
    {
      id: 8,
      dataHora: new Date('2025-01-01T16:45:00'),
      cliente: 'Henrique Henrique',
      produto: 'Fone de Ouvido Bluetooth Sony',
      acao: 'Efetuar Orçamento'
    },
    {
      id: 9,
      dataHora: new Date('2025-09-15T18:00:00'),
      cliente: 'Isabela Ivo',
      produto: 'Webcam Logitech C920',
      acao: 'Efetuar Orçamento'
    },
    {
      id: 10,
      dataHora: new Date('2025-01-01T19:15:00'),
      cliente: 'João Jardim',
      produto: 'Tablet Samsung Galaxy Tab S9',
      acao: 'Efetuar Orçamento'
    }
  ];

  solicitacoesFiltradas = [...this.solicitacoesAbertas];

  aplicarFiltro(){
    if (this.filtroSelecionado === 'Hoje') {
      const hoje = new Date(Date.now()).setHours(0, 0, 0, 0);
      this.solicitacoesFiltradas = this.solicitacoesAbertas.filter(s => {
        return new Date(s.dataHora).setHours(0, 0, 0, 0) === hoje;
      });
    } 
    else if (this.filtroSelecionado === 'Selecionar Período:') {
      let dip = this.dataInicial.split('-');  //Data Inicial Partes
      let dfp = this.dataFinal.split('-');    //Data Final Partes
      console.log(dip);

      let dataInicialCorrigida = new Date(+dip[0], +dip[1]-1, +dip[2]);
      let dataFinalCorrigida = new Date(+dfp[0], +dfp[1]-1, +dfp[2]);

      console.log("Data Inicial -----> " + dataInicialCorrigida);
      console.log("Data Final -------> " + dataFinalCorrigida);

      this.solicitacoesFiltradas = this.solicitacoesAbertas.filter(s => {
        return (new Date(s.dataHora.setHours(0, 0, 0, 0))) >= (dataInicialCorrigida) && (new Date(s.dataHora.setHours(0, 0, 0, 0))) <= (dataFinalCorrigida);
      });
    } 
    else /*Todas*/{
      this.solicitacoesFiltradas = [...this.solicitacoesAbertas];
    }
  }

  ngOnInit(): void {
    
  }

}
