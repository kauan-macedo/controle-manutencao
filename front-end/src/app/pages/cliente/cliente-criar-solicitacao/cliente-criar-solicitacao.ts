import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitacaoService } from '../../../services/solicitacao-service';
import { Solicitacao } from '../../../models/solicitacao';
import { ToastService } from '../../../services/toast-service';
import { CategoriaEquipamentoService } from '../../../services/categoria-equipamento-service';
import { CategoriaEquipamento } from '../../../models/categoria-equipamento';

@Component({
  selector: 'app-cliente-criar-solicitacao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente-criar-solicitacao.html',
  styleUrls: ['./cliente-criar-solicitacao.css'] // <- aqui
})
export class ClienteCriarSolicitacao implements OnInit {
  @Output() solicitacaoCriada = new EventEmitter<void>();

  solicitacao: Solicitacao = new Solicitacao('', new CategoriaEquipamento(0, ''), '', 0);
  categorias!: CategoriaEquipamento[];

  constructor(
    private solicitacaoService: SolicitacaoService,
    private toastService: ToastService,
    private categoriaService: CategoriaEquipamentoService
  ) {}

  async ngOnInit(): Promise<void> {
    this.categorias = await this.categoriaService.listarTodas((msg) => {
      this.toastService.showError(msg);
    });
  }

  onSubmit(form: any): void {
    if (form.valid) {
      this.solicitacaoService.adicionarSolicitacao(this.solicitacao);
      this.toastService.showSuccess('Solicitação criada com sucesso!');
      this.solicitacaoCriada.emit();
      form.resetForm();
    }
  }
}
