import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitacaoService } from '../../../services/solicitacao-service';
import { Solicitacao } from '../../../models/solicitacao';
import { ToastService } from '../../../services/toast-service';
import { CategoriaEquipamentoService } from '../../../services/categoria-equipamento-service';
import { Categoria } from '../../../models/categoria-equipamento';

@Component({
  selector: 'app-cliente-criar-solicitacao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente-criar-solicitacao.html',
  styleUrls: ['./cliente-criar-solicitacao.css'] // <- aqui
})
export class ClienteCriarSolicitacao implements OnInit {
  @Output() solicitacaoCriada = new EventEmitter<void>();

  solicitacao: Solicitacao = new Solicitacao() ;
  categorias!: Categoria[];

  constructor(
    private solicitacaoService: SolicitacaoService,
    private toastService: ToastService,
    private categoriaService: CategoriaEquipamentoService
  ) {}

  ngOnInit() {
    this.categorias = this.listarCategorias();
  }

  async onSubmit(form: any): Promise<void> {
    if (form.valid) {
      await this.solicitacaoService.adicionarSolicitacao(this.solicitacao!);
      this.toastService.showSuccess('Solicitação criada com sucesso!');
      this.solicitacaoCriada.emit();
      form.resetForm();
    }
  }

  listarCategorias(): Categoria[] {
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
}
