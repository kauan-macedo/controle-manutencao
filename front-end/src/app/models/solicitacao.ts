export class Solicitacao {
    id: number;
    dataHora: string;
    descricaoEquipamento: string;
    categoriaEquipamento: string;
    descricaoDefeito: string;
    estado: string;


constructor(
    descricaoEquipamento: string,
    categoriaEquipamento: string,
    descricaoDefeito: string
) {
    this.id = 0;
    this.dataHora = new Date().toISOString();
    this.descricaoEquipamento = descricaoEquipamento;
    this.categoriaEquipamento = categoriaEquipamento;
    this.descricaoDefeito = descricaoDefeito;
    this.estado = 'ABERTA';
    }
}