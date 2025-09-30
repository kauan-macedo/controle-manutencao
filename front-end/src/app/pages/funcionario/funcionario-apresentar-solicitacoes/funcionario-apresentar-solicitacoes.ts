import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StorageService } from '../../../services/storage-service';
import { Solicitacao } from '../../../models/solicitacao';

@Component({
  selector: 'app-funcionario-apresentar-solicitacoes',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe, FormsModule],
  templateUrl: './funcionario-apresentar-solicitacoes.html',
  styleUrl: './funcionario-apresentar-solicitacoes.css'
})
export class FuncionarioApresentarSolicitacoes implements OnInit {

  dropdown: string[] = ['Todas', 'Hoje', 'Selecionar Período:'];

  filtroSelecionado: string = 'Todas';

  dataInicial: string = '';
  dataFinal: string = '';

  solicitacoes: Solicitacao[] = [];
  solicitacoesFiltradas: Solicitacao[] = [];

  private readonly STORAGE_KEY = 'solicitacoes';

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    // Carrega todas as solicitações do storage
    this.solicitacoes = this.storageService.getDados(this.STORAGE_KEY) || [];
    this.solicitacoesFiltradas = [...this.solicitacoes];
  }

  aplicarFiltro() {
    if (this.filtroSelecionado === 'Hoje') {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      this.solicitacoesFiltradas = this.solicitacoes.filter(s => {
        const dataSolicitacao = new Date(s.dataHora);
        dataSolicitacao.setHours(0, 0, 0, 0);
        return dataSolicitacao.getTime() === hoje.getTime();
      });
    } else if (this.filtroSelecionado === 'Selecionar Período:') {
      if (!this.dataInicial || !this.dataFinal) return;

      const dip = this.dataInicial.split('-');
      const dfp = this.dataFinal.split('-');

      const dataInicialCorrigida = new Date(+dip[0], +dip[1] - 1, +dip[2]);
      const dataFinalCorrigida = new Date(+dfp[0], +dfp[1] - 1, +dfp[2]);

      this.solicitacoesFiltradas = this.solicitacoes.filter(s => {
        const dataSolicitacao = new Date(s.dataHora);
        dataSolicitacao.setHours(0, 0, 0, 0);
        return dataSolicitacao >= dataInicialCorrigida && dataSolicitacao <= dataFinalCorrigida;
      });
    } else {
      // Todas
      this.solicitacoesFiltradas = [...this.solicitacoes];
    }
  }
}
