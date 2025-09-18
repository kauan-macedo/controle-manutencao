import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriaEquipamentoService } from '../../../services/categoria-equipamento-service';
import { CategoriaEquipamento } from '../../../models/categoria-equipamento';

@Component({
  selector: 'app-funcionario-mostrar-categorias-equipamento',
  imports: [CommonModule, FormsModule],
  templateUrl: './funcionario-mostrar-categorias-equipamento.html',
  styleUrl: './funcionario-mostrar-categorias-equipamento.css'
})
export class FuncionarioMostrarCategoriasEquipamento implements OnInit {

  novaCategoria = new CategoriaEquipamento("");
  categoriaEmEdicao = new CategoriaEquipamento("");

  public categorias!: CategoriaEquipamento[];

  constructor(
    private categoriaService: CategoriaEquipamentoService
  ) {}

  ngOnInit(): void {
    this.categorias = this.listarTodas();
  }

  listarTodas(): CategoriaEquipamento[] {
    return this.categoriaService.listarTodas();
  }

  onAdicionar(form: any): void {
    if (form.invalid) {
      return;
    }

    this.categoriaService.inserir(this.novaCategoria);
    form.resetForm();
  }

  onEditar(categoria: CategoriaEquipamento): void {
    this.categoriaEmEdicao = categoria;
  }

  onSalvarEdicao(): void {
    if (!this.categoriaEmEdicao){
      return;
    }

    this.categoriaService.atualizar(this.categoriaEmEdicao);
  }

  onRemover(id: number): void {
    this.categoriaService.remover(id);
  }
}
