import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriaEquipamentoService } from '../../../services/categoria-equipamento-service';
import { Categoria } from '../../../models/categoria-equipamento';
import { LoadingOverlayComponent } from '../../../shared/loading-overlay.component';
import {finalize} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import { ModalRemoverCategoriaComponent } from '../../../shared/modal/modal-remover-categoria/modal-remover-categoria';
import { HttpErrorResponse } from '@angular/common/http';
import { APIResponse } from '../../../../api/api';


@Component({
  selector: 'app-funcionario-mostrar-categorias-equipamento',
  imports: [CommonModule, FormsModule, LoadingOverlayComponent, ModalRemoverCategoriaComponent],
  templateUrl: './funcionario-mostrar-categorias-equipamento.html',
  styleUrl: './funcionario-mostrar-categorias-equipamento.css'
})
export class FuncionarioMostrarCategoriasEquipamento implements OnInit {

  showRemoverModal = false;

  novaCategoria = new Categoria(0, "", true);
  categoriaEmEdicao: Categoria | null = null;
  categoriaParaRemover: Categoria | null = null;

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
        this.categorias = data;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse & { error: APIResponse<any> }) => {
        this.toastService.error(err.error.message);
      }
    });
  }

  endLoad = () => {
    setTimeout(() => {
        this.loading = false;
        this.cdr.detectChanges();
      })
  }

  onAdicionar(form: any) {
    if(form.invalid){
      return
    }
    this.loading = true;
    this.categoriaService.inserir(this.novaCategoria)
    .pipe(finalize(() => this.endLoad()))
    .subscribe({
      next: (data) => {
         this.toastService.success('Categoria adicionada com sucesso!');
        this.listarTodas()
      },
      error: (err: HttpErrorResponse & { error: APIResponse<any> }) => {
        this.toastService.error(err.error.message);
      }
    });
  }

  onEditar(cat: Categoria) {
    this.categoriaEmEdicao = cat;
  }

  onSalvarEdicao() {
    if(!this.categoriaEmEdicao) {
      return;
    }
    this.loading = true;
    this.categoriaService
      .atualizar(this.categoriaEmEdicao.id, this.categoriaEmEdicao.descricao)
      .pipe(finalize(() => this.endLoad()))
      .subscribe({
        next: (_) => {
          this.categoriaEmEdicao = null;
          this.toastService.success('Categoria atualizada com sucesso!');
          this.listarTodas();
        },
        error: (err: HttpErrorResponse & { error: APIResponse<any> }) => {
          this.toastService.error(err.error.message);
        }
      })
  }

  onRemover(cat: Categoria) {
    this.showRemoverModal = true;
    this.categoriaParaRemover = cat;
  }

  confirmarRemocao() {
    if (this.categoriaParaRemover) {
      this.loading = true;
      this.categoriaService.remover(this.categoriaParaRemover.id)
      .pipe(finalize(() => this.endLoad()))
      .subscribe({
      next: (_) => {
        this.listarTodas();
        this.categoriaParaRemover = null;
        this.toastService.success('Categoria removida com sucesso!');
        this.cancelarRemocao();
      },
      error: (err: HttpErrorResponse & { error: APIResponse<any> }) => {
          this.toastService.error(err.error.message);
        } 
      });
    }
  }

  cancelarRemocao() {
    this.showRemoverModal = false;
    this.categoriaParaRemover = null;
  }
}
