import { Categoria } from "./categoria-equipamento";
import { EstadosSolicitacao } from "./enums/estados-solicitacao";
import { LogSolicitacao } from "./log-solicitacao";
import { Orcamento } from "./orcamento";
import { Usuario } from "./usuario";

export class Solicitacao {
    id: number;
    status: EstadosSolicitacao;
    descricaoDefeito: string;
    descricaoEquipamento: string;
    dataCriacao: string;
    dataArrumado: string;
    orientacoesCliente: string;
    descricaoManutencao: string;
    motivoRejeicao: string;
    ativo: boolean;
    orcamento: Orcamento | null;
    usuario: Usuario;
    responsavel: Usuario | null;
    categoria: Categoria;
    historico: LogSolicitacao[]

    constructor(
        id: number = 0,
        status: EstadosSolicitacao = 1,
        categoria: Categoria = new Categoria(0, "", true),
        descricaoDefeito: string = "",
        descricaoEquipamento: string = "",
        dataCriacao: string = "",
        dataArrumado: string = "",
        orientacoesCliente: string = "",
        descricaoManutencao: string = "",
        motivoRejeicao: string = "",
        ativo: boolean = true,
        orcamento: Orcamento | null = null,
        usuario: Usuario = new Usuario(),
        responsavel: Usuario | null = null,
        historico: LogSolicitacao[] = []
    ) {
        this.id = id;
        this.status = status;
        this.orientacoesCliente = orientacoesCliente;
        this.descricaoManutencao = descricaoManutencao;
        this.categoria = categoria;
        this.motivoRejeicao = motivoRejeicao;
        this.descricaoDefeito = descricaoDefeito;
        this.descricaoEquipamento = descricaoEquipamento;
        this.dataCriacao = dataCriacao;
        this.dataArrumado = dataArrumado;
        this.ativo = ativo;
        this.orcamento = orcamento;
        this.usuario = usuario;
        this.responsavel = responsavel;
        this.historico = historico;
    }
}