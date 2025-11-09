import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {SolicitacaoService} from '../../../services/solicitacao-service';
import {Solicitacao} from '../../../models/solicitacao';
import {EstadosSolicitacao, translateEstado} from '../../../models/enums/estados-solicitacao';
import {LoadingOverlayComponent} from '../../../shared/loading-overlay.component';
import {formataData, getClasseEstado} from '../../../utils/utils';
import {finalize} from 'rxjs';
import {ModalPagarSolicitacao} from '../../../shared/modal/modal-pagar-solicitacao/modal-pagar-solicitacao';

@Component({
  selector: 'app-cliente-mostrar-solicitacao',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingOverlayComponent, ModalPagarSolicitacao],
  templateUrl: './cliente-mostrar-solicitacao.html',
  styleUrl: './cliente-mostrar-solicitacao.css',
})
export class ClienteMostrarSolicitacao implements OnInit {
  formataData = formataData
  translateEstado = translateEstado
  getClasseEstado = getClasseEstado
  pagando = false;
  solicitacao: Solicitacao | null = null;
  loading = false;

  constructor(private route: ActivatedRoute, private solicitacaoService: SolicitacaoService, private cdr: ChangeDetectorRef) {
  }

  async ngOnInit(): Promise<void> {
    const idDaUrl = this.route.snapshot.paramMap.get('id');

    //garantindo que o idDaUrl não é nulo
    if (!idDaUrl) {
      console.error('ID da solicitação não encontrado na URL');
      return;
    }

    const idNumerico = +idDaUrl;

    this.buscarPorId(idNumerico);

    //garantindo que o template vai ser carregado quando a requisicao for feita
    this.cdr.detectChanges();
  }

  endLoad = () => {
    setTimeout(() => {
      this.loading = false;
      this.cdr.detectChanges();
    })
  }

  traduzirEstado(estd: EstadosSolicitacao): string {
    return translateEstado(estd);
  }

  //Observer
  buscarPorId(id: number): void {
    this.loading = true;
    this.solicitacaoService.buscarPorId(id)
      .pipe(finalize(() => this.endLoad()))
      .subscribe({
        next: (data) => {
          this.solicitacao = data;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Erro ao carregar solicitações:', error);
        }
      });
  }
}
