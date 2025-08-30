import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliente-criar-solicitacao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente-criar-solicitacao.html',
  styleUrl: './cliente-criar-solicitacao.css'
})
export class ClienteCriarSolicitacao implements OnInit {

  solicitacao = {
    descricaoEquipamento: '',
    categoriaEquipamento: '',
    descricaoDefeito: ''
  };

  // lista de categorias para o combo box
  categorias: string[] = ['Notebook', 'Desktop', 'Impressora', 'Mouse', 'Teclado'];

  constructor() {}

  ngOnInit(): void {}

  onSubmit(form: any): void {
    //implementar logica
  }
}