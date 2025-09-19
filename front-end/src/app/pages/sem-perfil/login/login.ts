import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // Importação correta para o roteamento
import { FormsModule } from '@angular/forms'; // Adicione este import
import { AuthService } from '../../../services/auth';
import { ThemeToggle } from '../../../shared/theme-toggle/theme-toggle';
import { ToastService } from '../../../services/toast-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ThemeToggle],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  credenciais = { email: '', senha: '' };

  constructor(private router: Router, private authService: AuthService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.showPendingMessage();
  }


  onLogin(form: any): void {
    if (form.valid) {
      const { email, senha } = this.credenciais;
      const usuarioLogado = this.authService.login(email, senha);

      if (usuarioLogado) {
        if (usuarioLogado.perfil === 'CLIENTE') {
          this.router.navigate(['/cliente/pagina-inicial']);
        } else if (usuarioLogado.perfil === 'FUNCIONARIO') {
          this.router.navigate(['/funcionario/pagina-inicial']);
        }
      } else {
        alert('Email ou senha incorretos.');
      }
    }
  }
}