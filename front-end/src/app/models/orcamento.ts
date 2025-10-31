export class Orcamento {
    public valor: number;
    public descricao: string;
    public dataCriacao: string;
    
    constructor(
        valor: number,
        descricao: string,
        dataCriacao: string
    ) {
        this.valor = valor;
        this.descricao = descricao;
        this.dataCriacao = dataCriacao;
    }
}
