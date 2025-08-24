import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-autocadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './autocadastro.html',
  styleUrl: './autocadastro.css'
})
export class Autocadastro implements OnInit {
  cadastroForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.cadastroForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      nome: [''],
      email: [''],
      cpf: [''],
      telefone: [''],
      cep: [''],
      logradouro: [''],
      bairro: [''],
      cidade: [''],
      estado: [''],
      complemento: ['']
    });
  }

  onSubmit() {
    // implementar a lógica dos dados
  }

  buscarEndereco() {
    // implementar função que chama a api viaCep para completar automaticamente os campos de endereço
  }
}