import { CategoriaEquipamento } from "./categoria-equipamento";
import { EstadosSolicitacao } from "./enums/estados-solicitacao";

export class Solicitacao {
    id: number;
    dataHora: string;
    descricaoEquipamento: string;
    categoriaEquipamento: CategoriaEquipamento;
    descricaoDefeito: string;
    estado: EstadosSolicitacao; 
    clienteId: number;

    valorOrcamento?: number;
    dataOrcamento?: string;
    funcionarioOrcamentoId?: number;

    descricaoManutencao?: string;
    instrucoesCliente?: string;
    dataManutencao?: string;
    funcionarioManutencaoId?: number;

    constructor(
        descricaoEquipamento: string,
        categoriaEquipamento: CategoriaEquipamento,
        descricaoDefeito: string,
        clienteId: number
    ) {
        this.id = 0;
        this.dataHora = new Date().toISOString();
        this.descricaoEquipamento = descricaoEquipamento;
        this.categoriaEquipamento = categoriaEquipamento;
        this.descricaoDefeito = descricaoDefeito;
       
        this.estado = EstadosSolicitacao.NOVA;
        this.clienteId = clienteId;

        this.valorOrcamento = undefined;
        this.dataOrcamento = undefined;
        this.funcionarioOrcamentoId = undefined;

        this.descricaoManutencao = undefined;
        this.instrucoesCliente = undefined;
        this.dataManutencao = undefined;
        this.funcionarioManutencaoId = undefined;
    }
}