import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../../services/storage-service';
import { Solicitacao } from '../../../models/solicitacao';
import { RedirecionarService } from '../../../services/redirecionar-service';
import { Usuario } from '../../../models/usuario';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-funcionario-modal-redirecionar-manutencao',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './funcionario-modal-redirecionar-manutencao.html',
  styleUrl: './funcionario-modal-redirecionar-manutencao.css'
})
export class FuncionarioModalRedirecionarManutencao implements OnInit {

  private readonly SOLICITACOES_KEY = 'solicitacoes';
  private readonly LOGGED_USER_KEY = 'usuarioLogado';
  private readonly USUARIOS_KEY = 'usuarios';
  constructor(private route: ActivatedRoute, private router: Router, private storageService: StorageService, private redirecionarService: RedirecionarService) {}

  @Output() fechar = new EventEmitter<void>();

  funcionarios: any[] = [];
  funcionarioSelecionadoId: number | null = null;

  solicitacao: Solicitacao | undefined;
  cliente: Usuario | undefined;

  private todosOsFuncionarios = [
    { id: 1, nome: 'Maria' },
    { id: 2, nome: 'Mário' },
    { id: 3, nome: 'Carlos' },
    { id: 4, nome: 'Adão' },
    { id: 5, nome: 'Eva' },
    { id: 6, nome: 'Caim' },
    { id: 7, nome: 'Abel' },
    { id: 8, nome: 'Sete' },
    { id: 9, nome: 'Noé' },
    { id: 10, nome: 'Moisés' },
    { id: 11, nome: 'José' },
    { id: 12, nome: 'Jesus' },
  ];

  private idFuncionarioLogado = 1;

  ngOnInit(): void {
    const idDaUrl = this.route.snapshot.paramMap.get('id');
    const idNumerico = idDaUrl ? +idDaUrl : 0;
    const funcionarioLogado = this.storageService.getDados(this.LOGGED_USER_KEY) as unknown as Usuario | null;
    const todasAsSolicitacoes = this.storageService.getDados(this.SOLICITACOES_KEY);
    const todosOsUsuarios = this.storageService.getDados(this.USUARIOS_KEY);

    this.solicitacao = todasAsSolicitacoes.find(
      (s: any) => s.id === idNumerico
    );

    if (this.solicitacao && todosOsUsuarios) {
        this.solicitacao.dataCriacao = new Date(this.solicitacao.dataCriacao).toISOString();

        this.cliente = todosOsUsuarios.find(
            (u: any) => u.id === this.solicitacao?.usuario.id
        );
    }
    
    this.funcionarios = this.todosOsFuncionarios.filter(f => f.id !== this.idFuncionarioLogado);
  }

  onRedirecionar(): void {
    /**
     *  Falta pegar os funcionários do banco (atualmente hardcoded
     *  como um array de objetos (não está funcionando))
     * 
     *  Não sei como vai ser mantido o histórico de redirects
     */
    if (!this.funcionarioSelecionadoId) {
      alert('Por favor, selecione um funcionário.');
      return;
    }
    const funcionarioDestino = this.todosOsFuncionarios.find(f => f.id === this.funcionarioSelecionadoId);
    console.log(`Manutenção redirecionada para: ${funcionarioDestino?.nome}`);

    if(!funcionarioDestino) alert(`${this.todosOsFuncionarios}`); //Erro

    //this.redirecionarService.redirecionarManutencao(this.solicitacao!.id, funcionarioDestino!.id);
    this.fechar.emit();
  }

  onCancelar(): void {
    this.fechar.emit();
  }

}
