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

  async carregarSolicitacoes(): Promise<void> {
    const todas = await this.solicitacaoService.listarTodas((msg) => {
      this.toastService.showError(msg);
    });
   

    // filtrando as solicitacoes para novas aqui no front mesmo e pronto
    this.solicitacoesAbertas = todas.filter(s => s.estado === EstadosSolicitacao.NOVA);

    //garantindo que as solicitacoes serao mostradas
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
     this.carregarSolicitacoes();
  }

}
