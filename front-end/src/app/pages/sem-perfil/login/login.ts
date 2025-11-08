import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // Importação correta para o roteamento
import { FormsModule } from '@angular/forms'; // Adicione este import
import { AuthService } from '../../../services/auth';
import { ThemeToggle } from '../../../shared/theme-toggle/theme-toggle';
import { Usuario } from '../../../models/usuario';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';
import {APIResponse} from '../../../../api/api';
import {finalize} from 'rxjs';
import {LoadingOverlayComponent} from '../../../shared/loading-overlay.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ThemeToggle, ToastrModule, LoadingOverlayComponent],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loading = false;
  credenciais = { email: '', senha: '' };

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  endLoad = () => {
    setTimeout(() => {
      this.loading = false;
      this.cdr.detectChanges();
    })
  }

  onLogin(form: any): void {
    if (form.valid) {
      const { email, senha } = this.credenciais;
      this.loading = true;
      this.authService.login(email, senha)
        .pipe(finalize(() => this.endLoad()))
        .subscribe({
        next: data => {
          if(data.body.tipoUsuario === 'CLIENTE') {
            this.router.navigate(['/cliente/pagina-inicial']);
          } else {
            this.router.navigate(['/funcionario/pagina-inicial']);
          }
        },
        error: (err: HttpErrorResponse & { error: APIResponse<any> }) => {
          this.toastService.error(err.error.message);
        }
      })
    }
  }
}
