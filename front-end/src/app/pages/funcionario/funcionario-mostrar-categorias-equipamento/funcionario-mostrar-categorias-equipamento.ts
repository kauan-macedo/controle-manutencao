import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriaEquipamentoService } from '../../../services/categoria-equipamento-service';
import { Categoria } from '../../../models/categoria-equipamento';
import { ToastService } from '../../../services/toast-service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-funcionario-mostrar-categorias-equipamento',
  imports: [CommonModule, FormsModule],
  templateUrl: './funcionario-mostrar-categorias-equipamento.html',
  styleUrl: './funcionario-mostrar-categorias-equipamento.css'
})
export class FuncionarioMostrarCategoriasEquipamento implements OnInit {

  novaCategoria = new Categoria(0, "", true);
  categoriaEmEdicao = {
    id: 0,
    descricao: "",
    descricaoOriginal: ""
  };

  public categorias!: Categoria[];

  constructor(
    private categoriaService: CategoriaEquipamentoService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.categorias = this.listarTodas();
  }

  // Observer
  listarTodas(): Categoria[] {
    let cats: Categoria[] = [];
    this.categoriaService.listarTodas().subscribe({
      next: (data: Categoria[]) => {
        if(data == null){
          cats = []
        } else {
          cats = data;
          console.log("Cats recebeu data")
        }
      }
    });
    console.log("Cats foi retornado")
    return cats;
  }

  /* PROMISE
  async listarTodas(): Promise<CategoriaEquipamento[]> {
    let resp = await this.categoriaService.listarTodas((msg) => console.error(msg));
    return resp;
  }
  */

  // Observer
  buscarPorId(id: number): Categoria {
    let cat: Categoria = new Categoria(0, "", true);
    const resp = this.categoriaService.buscarPorId(id).subscribe({
      next: (data) => {
        if (data == null) {
          console.log("ID inexistente!")
        } else {
          cat = data;
        }
      }
    });
    return cat;
  }

  // Observer
  onAdicionar(form: any) {
    if(form.invalid){
      return
    }

    this.categoriaService.inserir(this.novaCategoria).subscribe({
      next: (data) => {
        return
      }
    });

    this.categorias = this.listarTodas()
  }
  
  /* PROMISE
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
  */

  
  /*async*/ onEditar(id: number) {
    let res: Categoria = this.buscarPorId(id);
    if (res.id !== 0){
      this.categoriaEmEdicao.id = res.id;
      this.categoriaEmEdicao.descricao = res.descricao;
      this.categoriaEmEdicao.descricaoOriginal = res.descricao;
    }
  }

  /*async*/ onSalvarEdicao() {
    this.categoriaService
      .atualizar(this.categoriaEmEdicao.id, this.categoriaEmEdicao.descricao)
      .subscribe({
        next: (_) => {
          this.categorias = this.listarTodas();
        }
      })
    this.categoriaEmEdicao.id = 0;
    this.categoriaEmEdicao.descricao = "";
  }

  /*async*/ onRemover(id: number) {
    let cat: Categoria = this.buscarPorId(id);
    if (confirm(`Deseja realmente excluir ${cat.descricao}?`)){
      this.categoriaService.remover(id);
      this.categorias = this.listarTodas();
    }
  }
}
