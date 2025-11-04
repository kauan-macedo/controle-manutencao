import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriaEquipamentoService } from '../../../services/categoria-equipamento-service';
import { Categoria } from '../../../models/categoria-equipamento';
import { ToastService } from '../../../services/toast-service';
import { Usuario } from '../../../models/usuario';
import { SpinnerComponent } from '../../../shared/loading-spinner/spinner';

@Component({
  selector: 'app-funcionario-mostrar-categorias-equipamento',
  imports: [CommonModule, FormsModule, SpinnerComponent],
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
  isLoading: boolean = false;

  constructor(
    private categoriaService: CategoriaEquipamentoService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.listarTodas();
  }

  listarTodas(): void {
    this.isLoading = true;
    this.categoriaService.listarTodas().subscribe({
      next: (data) => {
        this.categorias = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao buscar categorias:', error);
        this.categorias = [];
      }
    });
  }


  // essas funcoes ainda precisam de ajustes


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
        this.listarTodas()
      }
    });
  }
  
  
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
          this.listarTodas();
        }
      })
    this.categoriaEmEdicao.id = 0;
    this.categoriaEmEdicao.descricao = "";
  }

  /*async*/ onRemover(id: number) {
    let cat: Categoria = this.buscarPorId(id);
    if (confirm(`Deseja realmente excluir ${cat.descricao}?`)){
      this.categoriaService.remover(id);
      this.listarTodas();
    }
  }
}
