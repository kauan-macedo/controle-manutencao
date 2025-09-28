import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliente-rejeitar-servico',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cliente-rejeitar-servico.html',
  styleUrls: ['./cliente-rejeitar-servico.css']
})
export class ClienteRejeitarServico {

  @Output() fechar = new EventEmitter<void>();
  @Output() rejeitado = new EventEmitter<void>();

  confirmar(): void {
    this.rejeitado.emit();
    this.fechar.emit();
  }

  fecharModal(): void {
    this.fechar.emit();
  }

  cancelar(): void {
    this.fechar.emit();
  }
}
