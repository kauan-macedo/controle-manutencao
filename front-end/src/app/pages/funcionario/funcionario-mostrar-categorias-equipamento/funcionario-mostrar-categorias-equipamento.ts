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
  categoriaEmEdicao = {
    id: 0,
    nome: "",
    nomeOriginal: ""
  };

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
    this.categorias = this.listarTodas();
    form.resetForm();
  }

  onEditar(id: number): void {

    let res = this.categoriaService.buscarPorId(id);
    
    if (res !== undefined){
      this.categoriaEmEdicao.id = res.id;
      this.categoriaEmEdicao.nome = res.nome;
      this.categoriaEmEdicao.nomeOriginal = res.nome;
    }
  }

  onSalvarEdicao(): void {
    /*if (!this.categoriaEmEdicao){
      return;
    }*/

    this.categoriaService.atualizar(this.categoriaEmEdicao);
    this.categorias = this.listarTodas();
    this.categoriaEmEdicao.id = 0;
    this.categoriaEmEdicao.nome = "";
  }

  onRemover(id: number): void {
    this.categoriaService.remover(id);
    this.categorias = this.listarTodas();
  }
}
