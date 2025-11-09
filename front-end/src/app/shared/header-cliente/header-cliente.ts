import { Component } from '@angular/core';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { faComputer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalLogoutComponent } from '../modal/modal-logout/modal-logout';

@Component({
  selector: 'app-header-cliente',
  standalone: true,
  imports: [ThemeToggle, FontAwesomeModule, RouterLink, CommonModule, ModalLogoutComponent],
  templateUrl: './header-cliente.html',
  styleUrl: './header-cliente.css'
})
export class HeaderCliente {
  faComputer = faComputer;
  showLogoutModal = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogout(): void {
    this.showLogoutModal = true;
  }

  confirmLogout(): void {
    this.showLogoutModal = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  cancelLogout(): void {
    this.showLogoutModal = false;
  }
}
