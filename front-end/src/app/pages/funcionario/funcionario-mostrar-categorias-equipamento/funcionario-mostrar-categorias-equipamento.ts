import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-funcionario-mostrar-categorias-equipamento',
  imports: [CommonModule, FormsModule],
  templateUrl: './funcionario-mostrar-categorias-equipamento.html',
  styleUrl: './funcionario-mostrar-categorias-equipamento.css'
})
export class FuncionarioMostrarCategoriasEquipamento {
  categorias: any[] = [
    { id: 1, nome: 'Notebook' },
    { id: 2, nome: 'Impressora' },
    { id: 3, nome: 'Desktop' }
  ];

  novaCategoria = { nome: '' };
  categoriaEmEdicao: any = null;

  constructor() {}

  ngOnInit(): void {}

  onAdicionar(form: any): void {
   
  }

  onEditar(categoria: any): void {
    this.categoriaEmEdicao = { ...categoria };
  }

  onSalvarEdicao(): void {
  
  }

  onRemover(id: number): void {

  }
}
