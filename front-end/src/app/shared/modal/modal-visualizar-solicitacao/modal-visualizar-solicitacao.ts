import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Solicitacao} from '../../../models/solicitacao';
import {formataData, getClasseEstado} from '../../../utils/utils';
import {translateEstado} from '../../../models/enums/estados-solicitacao';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-modal-visualizar-solicitacao',
  imports: [
    NgClass
  ],
  templateUrl: './modal-visualizar-solicitacao.html',
  styleUrl: './modal-visualizar-solicitacao.css'
})
export class ModalVisualizarSolicitacao {
  formataData = formataData
  getClasseEstado = getClasseEstado
  @Input() solicitacao: Solicitacao | null = null;
  @Output() closed = new EventEmitter<void>();

  close() {
    this.solicitacao = null;
    this.closed.emit();
  }

  protected readonly translateEstado = translateEstado;
}
