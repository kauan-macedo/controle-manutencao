import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriaEquipamentoService } from '../../../services/categoria-equipamento-service';
import { CategoriaEquipamento } from '../../../models/categoria-equipamento';
import { ToastService } from '../../../services/toast-service';

@Component({
  selector: 'app-funcionario-mostrar-categorias-equipamento',
  imports: [CommonModule, FormsModule],
  templateUrl: './funcionario-mostrar-categorias-equipamento.html',
  styleUrl: './funcionario-mostrar-categorias-equipamento.css'
})
export class FuncionarioMostrarCategoriasEquipamento implements OnInit {

  novaCategoria = new CategoriaEquipamento(0, "");
  categoriaEmEdicao = {
    id: 0,
    descricao: "",
    descricaoOriginal: ""
  };

  public categorias!: CategoriaEquipamento[];

  constructor(
    private categoriaService: CategoriaEquipamentoService,
    private toastService: ToastService
  ) {}

  async ngOnInit(): Promise<void> {
    this.categorias = await this.listarTodas();
  }

  async listarTodas(): Promise<CategoriaEquipamento[]> {
    let resp = await this.categoriaService.listarTodas((msg) => console.error(msg));
    return resp;
  }

  async onAdicionar(form: any) {
    if (form.invalid) {
      return;
    }

    this.categoriaService.inserir(this.novaCategoria.descricao, (msg) => console.error(msg));
    this.categorias = await this.listarTodas();
    form.resetForm();
    const message = `Categoria cadastrada com sucesso!`;
    this.toastService.showSuccess(message)
  }

  async onEditar(id: number) {
    let res = await this.categoriaService.buscarPorId(id);
    if (res !== undefined){
      this.categoriaEmEdicao.id = res.id;
      this.categoriaEmEdicao.descricao = res.descricao;
      this.categoriaEmEdicao.descricaoOriginal = res.descricao;
    }
  }

  async onSalvarEdicao() {
    this.categoriaService.atualizar(this.categoriaEmEdicao.id, this.categoriaEmEdicao.descricao);
    this.categorias = await this.listarTodas();
    this.categoriaEmEdicao.id = 0;
    this.categoriaEmEdicao.descricao = "";
  }

  async onRemover(id: number) {
    await this.categoriaService.remover(id);
    this.categorias = await this.listarTodas();
  }
}
