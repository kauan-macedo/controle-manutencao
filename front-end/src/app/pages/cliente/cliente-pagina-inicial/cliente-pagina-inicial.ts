import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteCriarSolicitacao } from '../cliente-criar-solicitacao/cliente-criar-solicitacao';


@Component({
  selector: 'app-cliente-pagina-inicial',
  imports: [ ClienteCriarSolicitacao, CommonModule ],
  templateUrl: './cliente-pagina-inicial.html',
  styleUrl: './cliente-pagina-inicial.css'
})

export class ClientePaginaInicial {

  //adicionando funcao para exibir o componente de criar solicitacao na pagina inicial
  exibirModal: boolean = false;

  abrirModal(): void {
    this.exibirModal = true;
  }

  fecharModal(): void {
    this.exibirModal = false;
  }
}
