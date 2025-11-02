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

 
  constructor(
    private toastService: ToastService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    
  }
  
 

  

  onAdicionar(form: any): void {
    
  }

  onEditar(funcionario: any): void {
    
  }

  onSalvarEdicao(): void {
   
  }

  onRemover(id: number): void {
  }
}
