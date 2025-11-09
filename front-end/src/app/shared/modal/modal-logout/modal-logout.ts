import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-logout.html',
  styleUrls: ['./modal-logout.css']
})
export class ModalLogoutComponent {
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  confirm() {
    this.onConfirm.emit();
  }

  cancel() {
    this.onCancel.emit();
  }
}
