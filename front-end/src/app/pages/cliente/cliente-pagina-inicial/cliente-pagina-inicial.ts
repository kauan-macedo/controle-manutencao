import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClienteCriarSolicitacao } from '../cliente-criar-solicitacao/cliente-criar-solicitacao';
import { Solicitacao } from '../../../models/solicitacao';
import { SolicitacaoService } from '../../../services/solicitacao-service';


@Component({
  selector: 'app-cliente-pagina-inicial',
  imports: [ ClienteCriarSolicitacao, CommonModule, RouterModule ],
  templateUrl: './cliente-pagina-inicial.html',
  styleUrl: './cliente-pagina-inicial.css'
})

export class ClientePaginaInicial implements OnInit {

  exibirModal: boolean = false;
  minhasSolicitacoes: Solicitacao[] = [];

  constructor(private solicitacaoService: SolicitacaoService) {}

  carregarSolicitacoes(): void {
    this.minhasSolicitacoes = this.solicitacaoService.getSolicitacoesCliente();
  }
  
  
  ngOnInit(): void {
    this.carregarSolicitacoes();
  }   


  //adicionando funcao para exibir o componente de criar solicitacao na pagina inicial

  abrirModal(): void {
    this.exibirModal = true;
  }

  fecharModal(): void {
    this.exibirModal = false;
    this.carregarSolicitacoes();
  }
}
