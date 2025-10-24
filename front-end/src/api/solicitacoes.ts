import { Solicitacao } from "../app/models/solicitacao";
import { APIRequest, APIResponse, GET_PROMISED, POST_PROMISED, PUT_PROMISED } from "./api";

export const ID_SOLICITACAO_NOVA = 1;
export const ID_SOLICITACAO_REDIRECIONADA = 2;
export const ID_SOLICITACAO_ORCADA = 3;
export const ID_SOLICITACAO_REJEITADA = 4;
export const ID_SOLICITACAO_APROVADA = 5;
export const ID_SOLICITACAO_ARRUMADA = 6;
export const ID_SOLICITACAO_FINALIZADA = 7;

export interface FiltrosSolicitacao {
    de: string, //data dd/MM/yyyy
    ate: string //data dd/MM/yyyy
}
export async function buscaSolicitacoes(page: number, filtros: Partial<FiltrosSolicitacao>): Promise<APIResponse<Solicitacao[]>>{
    return await GET_PROMISED({
        route: "solicitacao",
        query: {
            de: filtros.de??null,
            ate: filtros.ate??null,
            page: page
        },
    })
}

export interface NovaSolicitacaoInput {
    desc_defeito: string,
    desc_equipamento: string,
    categoria_id: number
}
export async function novaSolicitacao(input: NovaSolicitacaoInput): Promise<APIResponse<any>> {
    return await POST_PROMISED({
        route: "solicitacao",
        body: input
    })
}

export async function redirecionarSolicitacao(solicitacao_id: number, funcionario_id: number): Promise<APIResponse<any>> {
    return await PUT_PROMISED({
        route: `solicitacao/${solicitacao_id}`,
        body: {
            status: ID_SOLICITACAO_REDIRECIONADA,
            responsavel_id: funcionario_id
        }
    })
}

export interface OrcamentoInput {
    solicitacao_id: number,
    valor: number,
    descricao: string
}
export async function orcarSolicitacao(input: OrcamentoInput): Promise<APIResponse<any>> {
    return await POST_PROMISED({
        route: `solicitacao/orcamento/${input.solicitacao_id}`,
        body: input
    })
}

export async function aprovarSolicitacao(solicitacao_id: number): Promise<APIResponse<any>> {
    return await PUT_PROMISED({
        route: `solicitacao/${solicitacao_id}`,
        body: {
            status: ID_SOLICITACAO_APROVADA
        }
    })
}

export async function rejeitarSolicitacao(solicitacao_id: number): Promise<APIResponse<any>> {
    return await PUT_PROMISED({
        route: `solicitacao/${solicitacao_id}`,
        body: {
            status: ID_SOLICITACAO_REJEITADA
        }
    })
}

export async function arrumarSolicitacao(solicitacao_id: number, dthArrumado: string): Promise<APIResponse<any>> {
    return await PUT_PROMISED({
        route: `solicitacao/${solicitacao_id}`,
        body: {
            status: ID_SOLICITACAO_ARRUMADA,
            dth_arrumado: dthArrumado
        }
    })
}

export async function pagarSolicitacao(solicitacao_id: number): Promise<APIResponse<any>> {
    return await PUT_PROMISED({
        route: `solicitacao/${solicitacao_id}`,
        body: {
            status: ID_SOLICITACAO_FINALIZADA
        }
    })
}