import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ThemeToggle } from '../../../shared/theme-toggle/theme-toggle';
import { Usuario } from '../../../models/usuario';
import { CadastroService } from '../../../services/cadastro-service';
import { ToastService } from '../../../services/toast-service';
import { ToastComponent } from '../../../shared/toast-component/toast-component';

@Component({
  selector: 'app-autocadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ThemeToggle, ToastComponent],
  templateUrl: './autocadastro.html',
  styleUrl: './autocadastro.css',
})
export class Autocadastro implements OnInit {
  usuario: Usuario = new Usuario('', '', '', '');

  constructor(private cadastroService: CadastroService, private toastService: ToastService, private router: Router) {}

  ngOnInit(): void {}

  // função para completar automaticamente o endereço usando a api ViaCEP
  buscarEndereco(): void {
    const cep = this.usuario.endereco.cep;
    if (cep && cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json())
        .then((dados) => {
          this.usuario.endereco.logradouro = dados.logradouro;
          this.usuario.endereco.bairro = dados.bairro;
          this.usuario.endereco.cidade = dados.localidade;
          this.usuario.endereco.estado = dados.uf;
        });
    }
  }

  onSubmit(form: any): void {
    //implementar método onsubmit de cadastro!
    if (form.valid) {
      this.cadastroService.registrarUsuario(this.usuario);

      const message = `Usuário cadastrado com sucesso! Sua senha é: ${this.usuario.senha}. 
      \nAnote sua senha! Você será redirecionado para a página de login em 15 segundos.`;
      this.toastService.showSuccess(message)

      setTimeout(() => {
      this.router.navigate(['/login']);
      }, 15000);
    }
  }
}
