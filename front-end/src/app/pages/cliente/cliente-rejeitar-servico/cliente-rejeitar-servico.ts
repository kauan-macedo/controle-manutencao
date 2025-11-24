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
  @Output() rejeitado = new EventEmitter<string>();

  motivoRejeicao: string = ""

  confirmar(form: any): void {
    if(form.valid) {
      this.rejeitado.emit(this.motivoRejeicao);
      this.fechar.emit();
    }
  }

  fecharModal(): void {
    this.fechar.emit();
  }

  cancelar(): void {
    this.motivoRejeicao = "";
    this.fechar.emit();
  }
}
