import { Component, OnInit } from '@angular/core';
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

  novoFuncionario = { nome: '', email: '', senha: '' };
  funcionarioEmEdicao: any = null;

  constructor(
    private toastService: ToastService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.buscarFuncionarios((x) => {
      debugger
      this.funcionarios = x
    });
  }

  buscarFuncionarios(then: (x: Usuario[]) => void) {
    this.usuarioService.buscarFuncionarios().subscribe(x => {
      if(x.error) {
        this.toastService.showError(x.message);
      } else {
        debugger
        then(x.body);
      }
    });
  }

  onAdicionar(form: any): void {
    if (form.invalid) {
      return;

    }

    form.resetForm();
    const message = `Funcionário cadastrado com sucesso!`;
    this.toastService.showSuccess(message)
  }

  onEditar(funcionario: any): void {
    
  }

  onSalvarEdicao(): void {
    if (!this.funcionarioEmEdicao) {
      return;
    }
    this.funcionarioEmEdicao = null;
  }

  onRemover(id: number): void {

  }
}
