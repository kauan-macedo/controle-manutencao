import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriaEquipamentoService } from '../../../services/categoria-equipamento-service';
import { Categoria } from '../../../models/categoria-equipamento';
import { LoadingOverlayComponent } from '../../../shared/loading-overlay.component';
import {finalize} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import { ModalRemoverCategoriaComponent } from '../../../shared/modal/modal-remover-categoria/modal-remover-categoria';


@Component({
  selector: 'app-funcionario-mostrar-categorias-equipamento',
  imports: [CommonModule, FormsModule, LoadingOverlayComponent, ModalRemoverCategoriaComponent],
  templateUrl: './funcionario-mostrar-categorias-equipamento.html',
  styleUrl: './funcionario-mostrar-categorias-equipamento.css'
})
export class FuncionarioMostrarCategoriasEquipamento implements OnInit {

  showRemoverModal = false;

  novaCategoria = new Categoria(0, "", true);
  categoriaEmEdicao = {
    id: 0,
    descricao: "",
    descricaoOriginal: ""
  };

  public categorias!: Categoria[];
  loading = false;

  constructor(
    private categoriaService: CategoriaEquipamentoService,
    private toastService: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.listarTodas();
  }

  listarTodas(): void {
    this.loading = true;
    this.categoriaService.listarTodas()
      .pipe(finalize(() => this.endLoad()))
      .subscribe({
      next: (data) => {
        this.categorias = data.body;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao buscar categorias:', error);
        this.categorias = [];
      }
    });
  }

  endLoad = () => {
    setTimeout(() => {
        this.loading = false;
        this.cdr.detectChanges();
      })
  }



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

  categoriaIdParaRemover: number | null = null;

  /*async*/ onRemover(id: number) {
    this.showRemoverModal = true;
    this.categoriaIdParaRemover = id;
  }

  confirmarRemocao() {
    if (this.categoriaIdParaRemover) {
      this.categoriaService.remover(this.categoriaIdParaRemover).subscribe(() => {
        this.listarTodas();
        this.cancelarRemocao();
      });
    }
  }

  cancelarRemocao() {
    this.showRemoverModal = false;
    this.categoriaIdParaRemover = null;
  }
}
