import { Routes } from '@angular/router';
import { Login } from './pages/login/login'
import { Autocadastro  } from './pages/autocadastro/autocadastro';
import { Layout } from './pages/layout/layout'
import { ClienteDashboard } from './pages/cliente-dashboard/cliente-dashboard';
import { FuncionarioDashboard } from './pages/funcionario-dashboard/funcionario-dashboard';
import { ClienteOrcamento } from './pages/cliente-orcamento/cliente-orcamento';
import { ClientePagarServico } from './pages/cliente-pagar-servico/cliente-pagar-servico';
import { ClienteVisualizarServico } from './pages/cliente-visualizar-servico/cliente-visualizar-servico';
import { FuncionarioEfetuarManutencao } from './pages/funcionario-efetuar-manutencao/funcionario-efetuar-manutencao';
import { FuncionarioEfetuarOrcamento } from './pages/funcionario-efetuar-orcamento/funcionario-efetuar-orcamento';
import { FuncionarioCrudEquip } from './pages/funcionario-crud-equip/funcionario-crud-equip';


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
            {
                path: 'cliente-dashboard',
                component: ClienteDashboard
            },
            {
                path: 'funcionario-dashboard',
                component: FuncionarioDashboard
            },
            {
                path: 'cliente-orcamento',
                component: ClienteOrcamento
            },
            {
                path: 'cliente-pagar-servico',
                component: ClientePagarServico
            },
            {
                path: 'cliente-visualizar-servico',
                component: ClienteVisualizarServico
            },
            {
                path: 'funcionario-efetuar-manutencao',
                component: FuncionarioEfetuarManutencao
            },
            {
                path: 'funcionario-efetuar-orcamento',
                component: FuncionarioEfetuarOrcamento
            },
            {
                path: 'funcionario-crud-equip',
                component: FuncionarioCrudEquip
            }
        ]
    }
];