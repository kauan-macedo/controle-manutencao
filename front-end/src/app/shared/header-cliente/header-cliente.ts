import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { faComputer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast-service';


@Component({
  selector: 'app-header-cliente',
  imports: [RouterLink, ThemeToggle, FontAwesomeModule],
  templateUrl: './header-cliente.html',
  styleUrl: './header-cliente.css'
})
export class HeaderCliente {
  faComputer = faComputer; //ícone que será mostrado no header

   constructor(private authService: AuthService, private router: Router, private toastService: ToastService) {}

   onLogout(): void {
    this.authService.logout();
    this.toastService.setPendingMessage('Logout realizado com sucesso!');
    this.router.navigate(['/login']);
  }
}
