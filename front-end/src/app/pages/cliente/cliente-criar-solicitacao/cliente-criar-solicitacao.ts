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
    this.listarCategorias((categorias) => this.categorias = categorias);
  }

  async onSubmit(form: any): Promise<void> {
    if (form.valid) {
      this.solicitacaoService.adicionarSolicitacao(this.solicitacao!).subscribe(res => {
        if(!res.error) {
          this.toastService.showSuccess('Solicitação criada com sucesso!');
          this.solicitacaoCriada.emit();
          form.resetForm();
        } else {
          this.toastService.showError(res.message);
        }
      });
    }
  }

  listarCategorias(then: (v: Categoria[]) => void) {
    this.categoriaService.listarTodas().subscribe({
      next: (data: Categoria[]) => {
        then(data);
      }
    });
  }
}
