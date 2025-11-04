import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast-service';
import { StorageService } from '../../../services/storage-service';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario-service';

@Component({
  selector: 'app-funcionario-manter-funcionario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './funcionario-manter-funcionario.html',
  styleUrl: './funcionario-manter-funcionario.css'
})
export class FuncionarioManterFuncionario implements OnInit {
  funcionarios: Usuario[] = [];

  novoFuncionario = { nome: '', email: '', senha: '', dt_nascimento: '' };
  funcionarioEmEdicao: any = null;

  constructor(
    private toastService: ToastService,
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.refreshUsers();
  }

  buscarFuncionarios(then: (x: Usuario[]) => void) {
    this.usuarioService.buscarFuncionarios().subscribe(x => {
      if(x.error) {
        this.toastService.showError(x.message);
      } else {
        then(x.body);
      }
    });
  }

  onAdicionar(form: any): void {
    if (form.invalid) {
      return;
    }
    this.usuarioService.criarFuncionario(this.novoFuncionario.nome, this.novoFuncionario.email, this.novoFuncionario.dt_nascimento, this.novoFuncionario.senha).subscribe(x => {
      if(x.error) {
        this.toastService.showError(x.message);
      } else {
        this.toastService.showSuccess(x.message);
        this.refreshUsers();
        form.resetForm();
      }
    })
  }

  onEditar(funcionario: any): void {
      this.funcionarioEmEdicao = funcionario
  }

  onSalvarEdicao(): void {
    if (!this.funcionarioEmEdicao) {
      return;
    }
    this.usuarioService.salvarFunctionario(this.funcionarioEmEdicao.id, this.funcionarioEmEdicao.email, this.funcionarioEmEdicao.nome).subscribe((x) => {
      if(x.error) {
        this.toastService.showError(x.message)
      } else {
        this.toastService.showSuccess(x.message);
        this.funcionarioEmEdicao = null;
      }
    });
  }

  onRemover(id: number): void {

  }

  refreshUsers() {
    this.buscarFuncionarios(x => {
      this.funcionarios = x
      this.cdr.detectChanges();
    });
  }
}
