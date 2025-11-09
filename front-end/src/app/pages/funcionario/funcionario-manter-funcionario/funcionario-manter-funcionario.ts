import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario-service';

import { LoadingOverlayComponent } from '../../../shared/loading-overlay.component';
import {ToastContainerDirective, ToastrModule, ToastrService} from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { APIResponse } from '../../../../api/api';
import {finalize} from 'rxjs';
import {validateEmail} from '../../../utils/utils';

@Component({
  selector: 'app-funcionario-manter-funcionario',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingOverlayComponent, ToastrModule],
  templateUrl: './funcionario-manter-funcionario.html',
  styleUrl: './funcionario-manter-funcionario.css'
})
export class FuncionarioManterFuncionario implements OnInit {
  funcionarios: Usuario[] = [];
  novoFuncionario = { nome: '', email: '', senha: '', dt_nascimento: '' };
  funcionarioEmEdicao: any = null;
  loading = false;
  excluindo: Usuario | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.refreshUsers();
  }

  endLoad = () => {
    setTimeout(() => {
      debugger
        this.loading = false;
        this.cdr.detectChanges();
      })
  }

  buscarFuncionarios(then: (x: Usuario[]) => void) {
    this.loading = true;
    this.usuarioService.buscarFuncionarios()
      .pipe(finalize(() => this.endLoad()))
      .subscribe({
      next: (x) => then(x.body),
      error: (err: HttpErrorResponse & { error: APIResponse<any> }) => {
        this.toastrService.error(err.error.message)
      }
    })
  }

  onAdicionar(form: any): void {
    if (form.invalid) {
      return;
    }
    if(!validateEmail(this.novoFuncionario.email)) {
      this.toastrService.error("E-mail inválido!");
      return;
    }
    this.loading = true;
    this.usuarioService.criarFuncionario(this.novoFuncionario.nome, this.novoFuncionario.email, this.novoFuncionario.dt_nascimento, this.novoFuncionario.senha)
      .pipe(finalize(() => this.endLoad()))
      .subscribe({
      next: (x) => {
        this.toastrService.success(x.message);
        this.refreshUsers();
        form.resetForm();
      },
      error: (err: HttpErrorResponse & { error: APIResponse<any> }) => {
        this.toastrService.error(err.error.message)
      },
    })
  }

  onEditar(funcionario: any): void {
      this.funcionarioEmEdicao = funcionario
  }

  onSalvarEdicao(): void {
    if (!this.funcionarioEmEdicao) {
      return;
    }
    this.loading = true;
    this.usuarioService.salvarFuncionario(this.funcionarioEmEdicao.id, this.funcionarioEmEdicao.email, this.funcionarioEmEdicao.nome)
      .pipe(finalize(() => this.endLoad()))
      .subscribe({
      next: (x) => {
        this.toastrService.success(x.message);
        this.funcionarioEmEdicao = null;
      },
      error: (err: HttpErrorResponse & { error: APIResponse<any> }) => {
        this.toastrService.error(err.error.message)
      }
    });
  }

  onRemover(): void {
    if(!this.excluindo) {
      return;
    }
    this.loading = true;
    this.usuarioService.inativarFuncionario(this.excluindo!.id)
      .pipe(finalize(() => this.endLoad()))
      .subscribe({
      next: (x) => {
        this.toastrService.success(x.message);
        this.excluindo = null;
        this.refreshUsers();
      },
      error: (err: HttpErrorResponse & { error: APIResponse<any> }) => {
        this.toastrService.error(err.error.message)
      }
    })
  }

  refreshUsers() {
    this.buscarFuncionarios(x => {
      this.funcionarios = x
      this.cdr.detectChanges();
    });
  }
}
