import { Usuario } from "./usuario";

export class LogSolicitacao {
    public agente: Usuario;
    public descricao: string;
    public data: string;

    constructor(
        agente: Usuario,
        descricao: string,
        data: string
    ) {
        this.agente = agente;
        this.descricao = descricao;
        this.data = data;
    }
}
