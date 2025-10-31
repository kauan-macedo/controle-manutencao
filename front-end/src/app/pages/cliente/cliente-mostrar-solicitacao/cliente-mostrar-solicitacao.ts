import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { SolicitacaoService } from '../../../services/solicitacao-service';
import { Solicitacao } from '../../../models/solicitacao';
import { Categoria } from '../../../models/categoria-equipamento';
import { EstadosSolicitacao, translateEstado } from '../../../models/enums/estados-solicitacao';

@Component({
  selector: 'app-cliente-mostrar-solicitacao',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cliente-mostrar-solicitacao.html',
  styleUrl: './cliente-mostrar-solicitacao.css',
})
export class ClienteMostrarSolicitacao implements OnInit {
  solicitacao: Solicitacao | null = null;

  constructor(private route: ActivatedRoute, private solicitacaoService: SolicitacaoService, private cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    const idDaUrl = this.route.snapshot.paramMap.get('id');

    //garantindo que o idDaUrl não é nulo
    if (!idDaUrl) {
      console.error('ID da solicitação não encontrado na URL');
      return;
    }

    const idNumerico = +idDaUrl;
    //chamando a funcao do solicitacaoservice
    
    this.solicitacao = this.buscarPorId(idNumerico);

    //Promise
    //this.solicitacao = await this.solicitacaoService.buscarPorId(idNumerico, (errorMsg) => {
    //  console.error('Erro ao buscar solicitação:', errorMsg);
    //});

    //garantindo que o template vai ser carregado quando a requisicao for feita
    this.cdr.detectChanges();
  }

  traduzirEstado(estd: EstadosSolicitacao): string {
    return translateEstado(estd);
  }

  //Observer
  buscarPorId(id: number): Solicitacao | null{
    let sol: Solicitacao | null = null;
    const resp = this.solicitacaoService.buscarPorId(id).subscribe({
      next: (data) => {
        if (data == null){
          console.log("ID inexistente")
        }else{
          sol = data;
        }
      }
    });
    
    return sol;
  }
}