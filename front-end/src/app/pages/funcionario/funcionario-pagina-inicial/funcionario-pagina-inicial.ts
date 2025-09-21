import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StorageService } from '../../../services/storage-service';
import { Solicitacao } from '../../../models/solicitacao';

@Component({
  selector: 'app-funcionario-pagina-inicial',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './funcionario-pagina-inicial.html',
  styleUrl: './funcionario-pagina-inicial.css'
})
export class FuncionarioPaginaInicial implements OnInit{

solicitacoesAbertas: Solicitacao[] = [];
private readonly STORAGE_KEY = 'solicitacoes';
  
constructor(private storageService: StorageService) {}


ngOnInit(): void {
    const todasAsSolicitacoes = this.storageService.getDados(this.STORAGE_KEY) as Solicitacao[];

    if (todasAsSolicitacoes) {
      this.solicitacoesAbertas = todasAsSolicitacoes.filter(solicitacao => solicitacao.estado === 'ABERTA');
    }
  }

}
