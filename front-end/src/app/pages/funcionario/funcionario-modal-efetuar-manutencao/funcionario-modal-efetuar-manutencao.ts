import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-funcionario-modal-efetuar-manutencao',
  imports: [ FormsModule, CommonModule],
  templateUrl: './funcionario-modal-efetuar-manutencao.html',
  styleUrl: './funcionario-modal-efetuar-manutencao.css'
})
export class FuncionarioModalEfetuarManutencao implements OnInit {

  funcionarios: Usuario[] = [];
  funcionarioSelecionadoId: number | null = null;

  @Output() fecharModalEfetuarManutencao: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    this.funcionarios = [
        new Usuario('Maria', 'maria@exemplo.com', '11111111111', '999999999', 'FUNCIONARIO'),
        new Usuario('João', 'joao@exemplo.com', '22222222222', '988888888', 'FUNCIONARIO'),
        new Usuario('Pedro', 'pedro@exemplo.com', '33333333333', '977777777', 'FUNCIONARIO')
    ];
    
    this.funcionarios[0].id = 1;
    this.funcionarios[1].id = 2;
    this.funcionarios[2].id = 3;
  }

  onCancelar(): void {
    this.fecharModalEfetuarManutencao.emit();
  }

  
}
