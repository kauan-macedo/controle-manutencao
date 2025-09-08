import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-funcionario-apresentar-solicitacoes',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './funcionario-apresentar-solicitacoes.html',
  styleUrl: './funcionario-apresentar-solicitacoes.css'
})  
export class FuncionarioApresentarSolicitacoes implements OnInit{

  solicitacoesAbertas = [
    {
      dataHora: new Date('2025-01-01T08:00:00'),
      cliente: 'Ana Almeida',
      produto: 'Notebook Acer Aspire 5',
      acao: 'Efetuar Orçamento'
    },
    {
      dataHora: new Date('2025-01-01T09:15:00'),
      cliente: 'Bruno Barbosa',
      produto: 'Smartphone Motorola Edge 50',
      acao: 'Efetuar Orçamento'
    },
    {
      dataHora: new Date('2025-01-01T10:30:00'),
      cliente: 'Carla Cunha',
      produto: 'Cadeira Gamer ThunderX3',
      acao: 'Efetuar Orçamento'
    },
    {
      dataHora: new Date('2025-01-01T11:45:00'),
      cliente: 'Diego Dias',
      produto: 'Roteador TP-Link AX1800',
      acao: 'Efetuar Orçamento'
    },
    {
      dataHora: new Date('2025-01-01T13:00:00'),
      cliente: 'Elisa Esteves',
      produto: 'Monitor LG Ultrawide 29"',
      acao: 'Efetuar Orçamento'
    },
    {
      dataHora: new Date('2025-01-01T14:15:00'),
      cliente: 'Felipe Fernandes',
      produto: 'Teclado Mecânico Logitech',
      acao: 'Efetuar Orçamento'
    },
    {
      dataHora: new Date('2025-01-01T15:30:00'),
      cliente: 'Gabriela Gomes',
      produto: 'Monitor AOC 29"',
      acao: 'Efetuar Orçamento'
    },
    {
      dataHora: new Date('2025-01-01T16:45:00'),
      cliente: 'Henrique Henrique',
      produto: 'Fone de Ouvido Bluetooth Sony',
      acao: 'Efetuar Orçamento'
    },
    {
      dataHora: new Date('2025-01-01T18:00:00'),
      cliente: 'Isabela Ivo',
      produto: 'Webcam Logitech C920',
      acao: 'Efetuar Orçamento'
    },
    {
      dataHora: new Date('2025-01-01T19:15:00'),
      cliente: 'João Jardim',
      produto: 'Tablet Samsung Galaxy Tab S9',
      acao: 'Efetuar Orçamento'
    }
  ];


  ngOnInit(): void {
    
  }

}
