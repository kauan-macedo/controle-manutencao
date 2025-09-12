import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-funcionario-pagina-inicial',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './funcionario-pagina-inicial.html',
  styleUrl: './funcionario-pagina-inicial.css'
})
export class FuncionarioPaginaInicial implements OnInit{

  solicitacoesAbertas = [
    {
      id: 1,
      dataHora: new Date('2025-01-01T08:00:00'),
      cliente: 'Ana Almeida',
      produto: 'Notebook Acer Aspire 5',
      status: 1,
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
      dataHora: new Date('2025-01-01T18:00:00'),
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


  ngOnInit(): void {
    
  }

}
