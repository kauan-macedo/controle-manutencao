import { CategoriaEquipamento } from "../app/models/categoria-equipamento";
import { APIResponse, DELETE_PROMISED, GET_PROMISED, POST_PROMISED, PUT_PROMISED } from "./api";

export async function buscarCategorias(): Promise<APIResponse<CategoriaEquipamento[]>> {
    return await GET_PROMISED<any, CategoriaEquipamento[]>({
        route: "categoria"
    })
}

export async function buscaCategoria(id: number): Promise<APIResponse<CategoriaEquipamento>> {
    return await GET_PROMISED<any, CategoriaEquipamento>({
        route: `categoria/${id}`
    })
}

export async function novaCategoria(desc: string): Promise<APIResponse<any>>{
    return await POST_PROMISED({
        route: "categoria",
        body: {
            descricao: desc
        }
    })
}

export async function atualizarCategoria(id: number, desc: string): Promise<APIResponse<any>> {
    return await PUT_PROMISED({
        route: `categoria/${id}`,
        body: {
            descricao: desc
        }
    })
}

export async function removerCategoria(id: number): Promise<APIResponse<any>> {
    return await DELETE_PROMISED({
        route: `categoria/${id}`
    })
}