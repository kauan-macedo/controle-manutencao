import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../../services/storage-service';
import { Solicitacao } from '../../../models/solicitacao';

@Component({
  selector: 'app-funcionario-pagina-inicial',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './funcionario-pagina-inicial.html',
  styleUrls: ['./funcionario-pagina-inicial.css']
})
export class FuncionarioPaginaInicial implements OnInit {

  dropdown: string[] = ['Todas', 'Hoje', 'Selecionar Período:'];
  filtroSelecionado: string = '';
  dataInicial: string = '';
  dataFinal: string = '';

  solicitacoesAbertas: Solicitacao[] = [];
  solicitacoesFiltradas: Solicitacao[] = [];

  private readonly STORAGE_KEY = 'solicitacoes';

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    const todasAsSolicitacoes = this.storageService.getDados(this.STORAGE_KEY) as Solicitacao[];
    
    if (todasAsSolicitacoes) {
      this.solicitacoesAbertas = todasAsSolicitacoes.filter(s => s.estado === 'ABERTA');
      this.solicitacoesFiltradas = [...this.solicitacoesAbertas];
    }
  }

  aplicarFiltro(): void {
    if (this.filtroSelecionado === 'Hoje') {
      const hoje = new Date(Date.now()).setHours(0, 0, 0, 0);
      this.solicitacoesFiltradas = this.solicitacoesAbertas.filter(s => {
        return new Date(s.dataHora).setHours(0, 0, 0, 0) === hoje;
      });
    } 
    else if (this.filtroSelecionado === 'Selecionar Período:') {
      if (!this.dataInicial || !this.dataFinal) return;
      const [yi, mi, di] = this.dataInicial.split('-').map(Number);
      const [yf, mf, df] = this.dataFinal.split('-').map(Number);
      const dataInicialCorrigida = new Date(yi, mi - 1, di);
      const dataFinalCorrigida = new Date(yf, mf - 1, df);

      this.solicitacoesFiltradas = this.solicitacoesAbertas.filter(s => {
        const data = new Date(s.dataHora);
        data.setHours(0, 0, 0, 0);
        return data >= dataInicialCorrigida && data <= dataFinalCorrigida;
      });
    } 
    else {
      this.solicitacoesFiltradas = [...this.solicitacoesAbertas];
    }
  }
}
