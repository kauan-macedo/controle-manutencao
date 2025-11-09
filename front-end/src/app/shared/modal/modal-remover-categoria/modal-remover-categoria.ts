import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-remover-categoria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-remover-categoria.html',
  styleUrls: ['./modal-remover-categoria.css']
})
export class ModalRemoverCategoriaComponent {
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  confirm() {
    this.onConfirm.emit();
  }

  cancel() {
    this.onCancel.emit();
  }
}
