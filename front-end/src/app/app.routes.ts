import { Routes } from '@angular/router';
import { Login } from './pages/sem-perfil/login/login';
import { Autocadastro  } from './pages/sem-perfil/autocadastro/autocadastro';
import { ClienteLayout } from './pages/cliente/cliente-layout/cliente-layout';
import { FuncionarioLayout } from './pages/funcionario/funcionario-layout/funcionario-layout';
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
import { FuncionarioManterFuncionario } from './pages/funcionario/funcionario-manter-funcionario/funcionario-manter-funcionario';
import { FuncionarioMostrarCategoriasEquipamento } from './pages/funcionario/funcionario-mostrar-categorias-equipamento/funcionario-mostrar-categorias-equipamento';
import { FuncionarioManterCategoriaEquipamento } from './pages/funcionario/funcionario-manter-categoria-equipamento/funcionario-manter-categoria-equipamento';
import { FuncionarioApresentarSolicitacoes } from './pages/funcionario/funcionario-apresentar-solicitacoes/funcionario-apresentar-solicitacoes';
import { FuncionarioEfetuarManutencao } from './pages/funcionario/funcionario-efetuar-manutencao/funcionario-efetuar-manutencao';
import { FuncionarioModalRedirecionarManutencao } from './pages/funcionario/funcionario-modal-redirecionar-manutencao/funcionario-modal-redirecionar-manutencao';
import { FuncionarioModalEfetuarManutencao } from './pages/funcionario/funcionario-modal-efetuar-manutencao/funcionario-modal-efetuar-manutencao';

/*

definindo a rota de login como default, após isso as rotas são divididas entre funcionario e cliente
*/

export const routes: Routes = [
    //rotas sem perfil
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

        // rotas para perfil cliente
        {
            path:'cliente',
            component: ClienteLayout,
            children: [
                {
                    path: 'pagina-inicial',
                    component: ClientePaginaInicial
                },
                {
                    path: 'criar-solicitacao',
                    component: ClienteCriarSolicitacao
                },
                {
                    path: 'mostrar-solicitacao/:id',
                    component: ClienteMostrarSolicitacao
                },
                {
                    path: 'mostrar-orcamento/:id',
                    component: ClienteMostrarOrcamento
                },
                {
                    path: 'aprovar-servico/:id',
                    component: ClienteAprovarServico
                },
                {
                    path: 'rejeitar-servico/:id',
                    component: ClienteRejeitarServico
                },
            ]
        },

        //rotas para perfil funcionario
        {
        path:'funcionario',
        component: FuncionarioLayout,
        children: [
            {
                path: 'pagina-inicial',
                component: FuncionarioPaginaInicial
            },
            {
                path: 'mostrar-relatorio-receitas',
                component: FuncionarioMostrarRelatorioReceitas
            },
            {
                path: 'mostrar-relatorio-receitas-categoria',
                component: FuncionarioMostrarRelatorioReceitasCategoria
            },
            {
                path: 'manter-funcionario',
                component: FuncionarioManterFuncionario
            },
            {
                path: 'mostrar-categorias-equipamento',
                component: FuncionarioMostrarCategoriasEquipamento
            },
            {
                path: 'manter-categoria-equipamento',
                component: FuncionarioManterCategoriaEquipamento
            },
            {
                path: 'efetuar-orcamento/:id',
                component: FuncionarioEfetuarOrcamento
            },
            {
                path: 'apresentar-solicitacoes',
                component: FuncionarioApresentarSolicitacoes
            },
            {
                path: 'efetuar-manutencao/:id',
                component: FuncionarioEfetuarManutencao
            },
            {
                path: 'funcionario-modal-redirecionar-manutencao/:id',
                component: FuncionarioModalRedirecionarManutencao
            },
            {
                path: 'funcionario-modal-efetuar-manutencao/:id',
                component: FuncionarioModalEfetuarManutencao
            }
        ]
    }

];
