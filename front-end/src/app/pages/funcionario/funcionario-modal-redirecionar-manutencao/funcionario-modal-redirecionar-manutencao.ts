import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-funcionario-modal-redirecionar-manutencao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './funcionario-modal-redirecionar-manutencao.html',
  styleUrl: './funcionario-modal-redirecionar-manutencao.css'
})
export class FuncionarioModalRedirecionarManutencao implements OnInit {
  @Output() fechar = new EventEmitter<void>();

  funcionarios: any[] = [];
  funcionarioSelecionadoId: number | null = null;

  private todosOsFuncionarios = [
    { id: 1, nome: 'Maria' },
    { id: 2, nome: 'Mário' },
    { id: 3, nome: 'Carlos' }
  ];

  private idFuncionarioLogado = 1;

  ngOnInit(): void {
    this.funcionarios = this.todosOsFuncionarios.filter(f => f.id !== this.idFuncionarioLogado);
  }

  onRedirecionar(): void {
    if (!this.funcionarioSelecionadoId) {
      alert('Por favor, selecione um funcionário.');
      return;
    }
    const funcionarioDestino = this.todosOsFuncionarios.find(f => f.id === this.funcionarioSelecionadoId);
    console.log(`Manutenção redirecionada para: ${funcionarioDestino?.nome}`);

    alert(`Serviço redirecionado com sucesso para ${funcionarioDestino?.nome}!`);
    this.fechar.emit();
  }

  onCancelar(): void {
    this.fechar.emit();
  }
}
