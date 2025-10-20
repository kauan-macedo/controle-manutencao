import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast-service';
import { StorageService } from '../../../services/storage-service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-funcionario-manter-funcionario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './funcionario-manter-funcionario.html',
  styleUrl: './funcionario-manter-funcionario.css'
})
export class FuncionarioManterFuncionario implements OnInit {
  funcionarios: any[] = [];

  novoFuncionario = { nome: '', email: '', senha: '' };
  funcionarioEmEdicao: any = null;

  // Funcionários devem ser carregados do mesmo lugar que outros usuários,
  // sendo filtrados pelo campo "Perfil":

  private readonly STORAGE_KEY = 'usuarios';

  constructor(
    private toastService: ToastService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.carregarDoLocalStorage();
  }
  
  private carregarDoLocalStorage(): void {
    /*
    // Implementação anterior:

    const dados = localStorage.getItem('funcionarios');
    if (dados) {
      this.funcionarios = JSON.parse(dados);
    } else {
      this.funcionarios = [
        { id: 1, nome: 'Maria', email: 'maria@exemplo.com' },
        { id: 2, nome: 'Mário', email: 'mario@exemplo.com' },
      ];
      this.salvarNoLocalStorage();
    }
    */

    //                                                "usuarios"
    const dados = this.storageService.getDados(this.STORAGE_KEY);
    if (dados){
      this.funcionarios = dados.filter( (usuario: Usuario) => {
        usuario.tipoUsuario == 'FUNCIONARIO';
      } )
    } else {
      this.funcionarios = [
        { id: 1, nome: 'Maria', email: 'maria@exemplo.com' },
        { id: 2, nome: 'Mário', email: 'mario@exemplo.com' },
      ];
      this.salvarNoLocalStorage();
    }

  }

  private salvarNoLocalStorage(): void {
    // Deve ser utilizado o StorageService, no mesmo array de usuários
    // localStorage.setItem('funcionarios', JSON.stringify(this.funcionarios));

    const dados = this.storageService.getDados(this.STORAGE_KEY);
    if (dados){
      const notFuncionarios = dados.filter(u => u.tipoUsuario == 'CLIENTE');
      let usuarios = notFuncionarios
      usuarios.push(this.funcionarios)
      this.storageService.salvarDados(this.STORAGE_KEY, usuarios);
    } else {
      this.storageService.salvarDados(this.STORAGE_KEY, this.funcionarios);
    }
    
  }

  onAdicionar(form: any): void {
    if (form.invalid) {
      return;

    }

    const novoId = new Date().getTime();
    this.funcionarios.push({id: novoId, ...this.novoFuncionario});
    this.salvarNoLocalStorage();
    form.resetForm();
    const message = `Funcionário cadastrado com sucesso!`;
    this.toastService.showSuccess(message)
  }

  onEditar(funcionario: any): void {
    this.funcionarioEmEdicao = { ...funcionario };
  }

  onSalvarEdicao(): void {
    if (!this.funcionarioEmEdicao) {
      return;
    }

    const index = this.funcionarios.findIndex(f => f.id === this.funcionarioEmEdicao.id);
    if (index !== -1) {

      this.funcionarios[index] = this.funcionarioEmEdicao;
      this.salvarNoLocalStorage();
    }


    this.funcionarioEmEdicao = null;
  }

  onRemover(id: number): void {
    this.funcionarios = this.funcionarios.filter(f => f.id !== id);
    this.salvarNoLocalStorage();
  }
}
