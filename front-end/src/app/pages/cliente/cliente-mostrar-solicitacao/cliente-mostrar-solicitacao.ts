import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../services/storage-service';

@Component({
  selector: 'app-cliente-mostrar-solicitacao',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cliente-mostrar-solicitacao.html',
  styleUrl: './cliente-mostrar-solicitacao.css',
})
export class ClienteMostrarSolicitacao implements OnInit {
  solicitacao: any;
  private readonly STORAGE_KEY = 'solicitacoes';

  constructor(private route: ActivatedRoute, private storageService: StorageService) {}

  ngOnInit(): void {
    const idDaUrl = this.route.snapshot.paramMap.get('id');
    const idNumerico = idDaUrl ? +idDaUrl : 0;

    const todasAsSolicitacoes = this.storageService.getDados(this.STORAGE_KEY);

    this.solicitacao = todasAsSolicitacoes.find(
      (s: any) => s.id === idNumerico
    );

    if (this.solicitacao) {
      this.solicitacao.dataHora = new Date(this.solicitacao.dataHora);
      
    
      if (this.solicitacao.historico && this.solicitacao.historico.length > 0) {
        this.solicitacao.historico.forEach((item: any) => {
          item.dataHora = new Date(item.dataHora);
        });
      }
    }
  }
}