export class Categoria {
    public id: number;
    public descricao: string;
    public ativo: boolean;
    
    constructor(
        id: number,
        descricao: string,
        ativo: boolean
    ) {
        this.id = id;
        this.ativo = ativo;
        this.descricao = descricao;
    }
}
