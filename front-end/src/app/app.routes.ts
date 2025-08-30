import { Routes } from '@angular/router';
import { Login } from './pages/sem-perfil/login/login'
import { Autocadastro  } from './pages/sem-perfil/autocadastro/autocadastro';
import { Layout } from './pages/layout/layout'
import { ClientePaginaInicial } from './pages/cliente/cliente-pagina-inicial/cliente-pagina-inicial';
import { FuncionarioPaginaInicial } from './pages/funcionario/funcionario-pagina-inicial/funcionario-pagina-inicial';
import { ClienteCriarSolicitacao } from './pages/cliente/cliente-criar-solicitacao/cliente-criar-solicitacao';
import { ClienteMostrarSolicitacao } from './pages/cliente/cliente-mostrar-solicitacao/cliente-mostrar-solicitacao';
import { ClienteMostrarOrcamento } from './pages/cliente/cliente-mostrar-orcamento/cliente-mostrar-orcamento';
import { ClienteAprovarServico } from './pages/cliente/cliente-aprovar-servico/cliente-aprovar-servico';
import { ClienteRejeitarServico } from './pages/cliente/cliente-rejeitar-servico/cliente-rejeitar-servico';
import { FuncionarioEfetuarOrcamento } from './pages/funcionario/funcionario-efetuar-orcamento/funcionario-efetuar-orcamento';
import { FuncionarioMostrarRelatorioReceitas } from './pages/funcionario/funcionario-mostrar-relatorio-receitas/funcionario-mostrar-relatorio-receitas';
import { FuncionarioMostrarRelatorioReceitasCategoria } from './pages/funcionario/funcionario-mostrar-relatorio-receitas-categoria/funcionario-mostrar-relatorio-receitas-categoria';
import { FuncionarioMostrarFuncionarios } from './pages/funcionario/funcionario-mostrar-funcionarios/funcionario-mostrar-funcionarios';
import { FuncionarioManterFuncionario } from './pages/funcionario/funcionario-manter-funcionario/funcionario-manter-funcionario';
import { FuncionarioMostrarCategoriasEquipamento } from './pages/funcionario/funcionario-mostrar-categorias-equipamento/funcionario-mostrar-categorias-equipamento';
import { FuncionarioManterCategoriaEquipamento } from './pages/funcionario/funcionario-manter-categoria-equipamento/funcionario-manter-categoria-equipamento';
import { FuncionarioApresentarSolicitacoes } from './pages/funcionario/funcionario-apresentar-solicitacoes/funcionario-apresentar-solicitacoes';
import { FuncionarioEfetuarManutencao } from './pages/funcionario/funcionario-efetuar-manutencao/funcionario-efetuar-manutencao';

/*

definindo a rota de login como default por enquanto, os componentes que vêm após a página de login podem ser
criados dentro do componente layout (assim como dashboard, até agora)

*/

export const routes: Routes = [

    {
        path:'',
        redirectTo: 'login',
        pathMatch: 'full'
    },

    {
        path:'login',
        component: Login
    },

    {
        path: 'autocadastro',
        component: Autocadastro
    },


    {
        path:'',
        component: Layout,

        //criar rotas novas aqui
        children: [

            // Rotas Cliente
            {
                path: 'cliente-pagina-inicial',
                component: ClientePaginaInicial
            },
            {
                path: 'cliente-criar-solicitacao',
                component: ClienteCriarSolicitacao
            },
            {
                path: 'cliente-mostrar-solicitacao/:id',
                component: ClienteMostrarSolicitacao
            },
            {
                path: 'cliente-mostrar-orcamento',
                component: ClienteMostrarOrcamento
            },
            {
                path: 'cliente-aprovar-servico',
                component: ClienteAprovarServico
            },
            {
                path: 'cliente-rejeitar-servico',
                component: ClienteRejeitarServico
            },

            // Rotas Funcionário
            {
                path: 'funcionario-pagina-inicial',
                component: FuncionarioPaginaInicial
            },
            {
                path: 'funcionario-mostrar-relatorio-receitas',
                component: FuncionarioMostrarRelatorioReceitas
            },
            {
                path: 'funcionario-mostrar-relatorio-receitas-categoria',
                component: FuncionarioMostrarRelatorioReceitasCategoria
            },
            {
                path: 'funcionario-mostrar-funcionarios',
                component: FuncionarioMostrarFuncionarios
            },
            {
                path: 'funcionario-manter-funcionario',
                component: FuncionarioManterFuncionario
            },
            {
                path: 'funcionario-mostrar-categorias-equipamento',
                component: FuncionarioMostrarCategoriasEquipamento
            },
            {
                path: 'funcionario-manter-categoria-equipamento',
                component: FuncionarioManterCategoriaEquipamento
            },
            {
                path: 'funcionario-efetuar-orcamento',
                component: FuncionarioEfetuarOrcamento
            },
            {
                path: 'funcionario-apresentar-solicitacoes',
                component: FuncionarioApresentarSolicitacoes
            },
            {
                path: 'funcionario-efetuar-manutencao',
                component: FuncionarioEfetuarManutencao
            }
        ]
    }
];
