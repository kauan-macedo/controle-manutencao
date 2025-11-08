import { Component } from '@angular/core';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { faComputer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import {ToastrModule, ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-header-cliente',
  imports: [ThemeToggle, FontAwesomeModule, RouterLink],
  templateUrl: './header-cliente.html',
  styleUrl: './header-cliente.css'
})
export class HeaderCliente {
  faComputer = faComputer; //ícone que será mostrado no header

   constructor(private authService: AuthService, private router: Router) {}

   onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
