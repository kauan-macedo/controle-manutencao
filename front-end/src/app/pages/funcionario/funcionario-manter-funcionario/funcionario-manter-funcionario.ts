import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-funcionario-manter-funcionario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './funcionario-manter-funcionario.html',
  styleUrl: './funcionario-manter-funcionario.css'
})
export class FuncionarioManterFuncionario implements OnInit {
  funcionarios: any[] = [
    { id: 1, nome: 'Maria', email: 'maria@exemplo.com' },
    { id: 2, nome: 'Mário', email: 'mario@exemplo.com' },
  ];

  novoFuncionario = { nome: '', email: '', senha: '' };
  funcionarioEmEdicao: any = null;

  constructor() {}

  ngOnInit(): void {}

  onAdicionar(form: any): void {
    
  }

  onEditar(funcionario: any): void {
    
  }

  onSalvarEdicao(): void {
    
  }

  onRemover(id: number): void {
    
  }
}