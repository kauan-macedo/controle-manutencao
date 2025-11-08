import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Solicitacao } from '../../../models/solicitacao';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-resgatar-servico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-resgatar-servico.html',
  styleUrls: ['./modal-resgatar-servico.css']
})
export class ModalResgatarServicoComponent {

  @Input() solicitacao: Solicitacao | null = null;
  @Output() confirm = new EventEmitter<Solicitacao>();
  @Output() cancel = new EventEmitter<void>();

  confirmar(): void {
    if (this.solicitacao) {
      this.confirm.emit(this.solicitacao);
    }
  }

  cancelar(): void {
    this.cancel.emit();
  }
}
