import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-cliente-aprovar-servico',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cliente-aprovar-servico.html',
  styleUrls: ['./cliente-aprovar-servico.css']
})
export class ClienteAprovarServico {

  @Output() fechar = new EventEmitter<void>();
  @Output() aprovado = new EventEmitter<void>();

  confirmar(): void {
    this.aprovado.emit();
    this.fechar.emit();
  }

  fecharModal(): void {
    this.fechar.emit();
  }

  cancelar(): void {
    this.fechar.emit();
  }
}
