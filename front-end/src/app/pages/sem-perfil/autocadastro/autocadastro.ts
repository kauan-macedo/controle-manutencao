import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ThemeToggle } from '../../../shared/theme-toggle/theme-toggle';
import { Usuario } from '../../../models/usuario';
import { CadastroService } from '../../../services/cadastro-service';
import { ToastService } from '../../../services/toast-service';
import { MaskDirective } from '../../../shared/directives/mask.directive';
import { LoadingOverlayComponent } from '../../../shared/loading-overlay.component';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { APIResponse } from '../../../../api/api';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-autocadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ThemeToggle, MaskDirective, LoadingOverlayComponent],
  templateUrl: './autocadastro.html',
  styleUrl: './autocadastro.css',
})
export class Autocadastro implements OnInit {
  usuario: Usuario = new Usuario('', '', '', '', '', '', { cep: '', logradouro: '', bairro: '', cidade: '', estado: '', numero: '' });
  loading = false;

  constructor(
    private cadastroService: CadastroService,
    private cdr: ChangeDetectorRef,
    private toastService: ToastrService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {}

  endLoad = () => {
    setTimeout(() => {
        this.loading = false;
        this.cdr.detectChanges();
      })
  }

  // função para completar automaticamente o endereço usando a api ViaCEP
  buscarEndereco(): void {
    this.loading = true;
    const cep = this.usuario.endereco.cep.substring(0,9).replaceAll("-", "");
    if (cep && cep.length == 8) {
      fetch(`https://viacep.com.br/ws/${cep.substring(0,8)}/json/`)
        .then((response) => response.json())
        .then((dados) => {
          if(dados.erro) {
            this.toastService.error("CEP inválido!")
            return;
          }
          this.usuario.endereco.logradouro = dados.logradouro;
          this.usuario.endereco.bairro = dados.bairro;
          this.usuario.endereco.cidade = dados.localidade;
          this.usuario.endereco.estado = dados.uf;
        }).finally(() => this.endLoad());
    }
  }

  onSubmit(form: any): void {
    //implementar método onsubmit de cadastro!
    this.loading = true
    if (form.valid) {
      this.cadastroService.registrarUsuario(this.usuario)
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this.loading = false;
            this.cdr.detectChanges();
          }, 10);
        })
      )
      .subscribe({
        next:(res) => {
          this.toastService.success(res.message);
          setTimeout(() => {
            this.ngZone.run(() => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/cliente/pagina-inicial']);
              });
            });
          }, 3000)
        },
        error: (err: HttpErrorResponse & { error: APIResponse<any> }) => {
          this.toastService.error(err.error.message)
        }
      })
    }
  }
}
