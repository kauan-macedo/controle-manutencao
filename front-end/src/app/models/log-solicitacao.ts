import { EstadosSolicitacao } from "./enums/estados-solicitacao";
import { Usuario } from "./usuario";

export class LogSolicitacao {
    public agente: Usuario;
    public statusAnterior: EstadosSolicitacao;
    public novoStatus: EstadosSolicitacao;
    public data: string;
    
    constructor(
        agente: Usuario,
        statusAnterior: EstadosSolicitacao,
        novoStatus: EstadosSolicitacao,
        data: string
    ) {
        this.agente = agente;
        this.statusAnterior = statusAnterior;
        this.novoStatus = novoStatus;
        this.data = data;
    }
}
