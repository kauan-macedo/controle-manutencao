import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // Importação correta para o roteamento
import { FormsModule } from '@angular/forms'; // Adicione este import
import { AuthService } from '../../../services/auth';
import { ThemeToggle } from '../../../shared/theme-toggle/theme-toggle';
import { Usuario } from '../../../models/usuario';
import {ToastrModule, ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ThemeToggle, ToastrModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  credenciais = { email: '', senha: '' };

  constructor(private router: Router, private authService: AuthService, private toastService: ToastrService) {}

  onLogin(form: any): void {
    if (form.valid) {
      const { email, senha } = this.credenciais;
      this.authService.login(email, senha,
        (user: Usuario) => {
          if(user.tipoUsuario === 'CLIENTE') {
            this.router.navigate(['/cliente/pagina-inicial']);
          } else {
            this.router.navigate(['/funcionario/pagina-inicial']);
          }
        },
        () => { // Handler de erro
          this.toastService.error('Email ou senha incorretos.');
        }
      );
    }
  }
}
