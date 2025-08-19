import { Routes } from '@angular/router';
import { Login } from './pages/login/login'
import { Layout } from './pages/layout/layout'
import { ClienteDashboard } from './pages/cliente-dashboard/cliente-dashboard';
import { FuncionarioDashboard } from './pages/funcionario-dashboard/funcionario-dashboard';


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
        component:Login
    },


    {
        path:'',
        component: Layout,

        //criar componentes novos aqui
        children: [
            {
                path: 'cliente-dashboard',
                component: ClienteDashboard
            },
            {
                path: 'funcionario-dashboard',
                component: FuncionarioDashboard
            }
        ]
    }
];
