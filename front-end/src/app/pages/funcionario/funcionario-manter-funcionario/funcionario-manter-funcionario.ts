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
  funcionarios: any[] = [];

  novoFuncionario = { nome: '', email: '', senha: '' };
  funcionarioEmEdicao: any = null;

  constructor() {}

  ngOnInit(): void {
    this.carregarDoLocalStorage();
  }
  
  private carregarDoLocalStorage(): void {
    const dados = localStorage.getItem('funcionarios');
    if (dados) {
      this.funcionarios = JSON.parse(dados);
    } else {
      this.funcionarios = [
        { id: 1, nome: 'Maria', email: 'maria@exemplo.com' },
        { id: 2, nome: 'Mário', email: 'mario@exemplo.com' },
      ];
      this.salvarNoLocalStorage();
    }
  }

  private salvarNoLocalStorage(): void {
    localStorage.setItem('funcionarios', JSON.stringify(this.funcionarios));
  }

  onAdicionar(form: any): void {
    if (form.invalid) {
      return;

    }

    const novoId = new Date().getTime();
    this.funcionarios.push({id: novoId, ...this.novoFuncionario});
    this.salvarNoLocalStorage();
    form.resetForm();
  }

  onEditar(funcionario: any): void {
    this.funcionarioEmEdicao = { ...funcionario };
  }

  onSalvarEdicao(): void {
    if (!this.funcionarioEmEdicao) {
      return;
    }

    const index = this.funcionarios.findIndex(f => f.id === this.funcionarioEmEdicao.id);
    if (index !== -1) {

      this.funcionarios[index] = this.funcionarioEmEdicao;
      this.salvarNoLocalStorage();
    }


    this.funcionarioEmEdicao = null;
  }

  onRemover(id: number): void {
    this.funcionarios = this.funcionarios.filter(f => f.id !== id);
    this.salvarNoLocalStorage();
  }
}
