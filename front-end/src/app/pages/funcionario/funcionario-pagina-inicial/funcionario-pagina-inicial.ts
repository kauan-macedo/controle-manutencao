import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SolicitacaoService } from '../../../services/solicitacao-service';
import { Solicitacao } from '../../../models/solicitacao';
import { ToastService } from '../../../services/toast-service';
import { EstadosSolicitacao } from '../../../models/enums/estados-solicitacao';

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


  constructor(private solicitacaoService: SolicitacaoService, private toastService: ToastService, private cdr: ChangeDetectorRef) {}

  carregarSolicitacoes(): void {
    this.solicitacaoService.buscarTodas().subscribe({
      next: (solicitacoes) => {
        this.solicitacoesAbertas = solicitacoes;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao carregar solicitações:', error);
        this.toastService.showError('Erro ao carregar solicitações.');
      },
    });
  }

  ngOnInit(): void {
     this.carregarSolicitacoes();
  }

}
