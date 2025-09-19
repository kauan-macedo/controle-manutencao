import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitacaoService } from '../../../services/solicitacao-service';
import { Solicitacao } from '../../../models/solicitacao';
import { ToastService } from '../../../services/toast-service';

@Component({
  selector: 'app-cliente-criar-solicitacao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente-criar-solicitacao.html',
  styleUrl: './cliente-criar-solicitacao.css'
})
export class ClienteCriarSolicitacao implements OnInit {

  @Output() solicitacaoCriada = new EventEmitter<void>();

  solicitacao: Solicitacao = new Solicitacao('', '', '');
  // lista de categorias para o combo box
  categorias: string[] = ['Notebook', 'Desktop', 'Impressora', 'Mouse', 'Teclado'];

  constructor(private solicitacaoService: SolicitacaoService, private toastService: ToastService) {}

  ngOnInit(): void {}

  onSubmit(form: any): void {
    if (form.valid) {
      this.solicitacaoService.adicionarSolicitacao(this.solicitacao);
      this.solicitacaoCriada.emit();
      const message = `Solicitação criada com sucesso!`;
      this.toastService.showSuccess(message)
    }
  }
}