import {EstadosSolicitacao} from '../models/enums/estados-solicitacao';

export function formataData(str: string): string {
    const data = new Date(str);

    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();

    const hora = String(data.getHours()).padStart(2, '0');
    const minuto = String(data.getMinutes()).padStart(2, '0');
    return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
}

export function validateEmail(email: string): boolean {
  return email.toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) != null;
};


export function getClasseEstado(estado: EstadosSolicitacao): string {
  switch (estado) {
    // Requisito: Cinza
    case EstadosSolicitacao.NOVA:
      return 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200';

    // Requisito: Marrom
    case EstadosSolicitacao.ORCADA:
      return 'bg-amber-200 text-amber-800 dark:bg-amber-800 dark:text-amber-100';

    // Requisito: Vermelho
    case EstadosSolicitacao.REJEITADA:
      return 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-100';

    // Requisito: Amarelo
    case EstadosSolicitacao.APROVADA:
      return 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';

    // Requisito: Roxo
    case EstadosSolicitacao.REDIRECIONADA:
      return 'bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-100';

    // Requisito: Azul
    case EstadosSolicitacao.ARRUMADA:
      return 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-100';

    // Requisito: Laranja
    case EstadosSolicitacao.PAGA:
      return 'bg-orange-200 text-orange-800 dark:bg-orange-800 dark:text-orange-100';

    // Requisito: Verde
    case EstadosSolicitacao.FINALIZADA:
      return 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-100';

    default:
      return 'bg-gray-100 text-gray-800';
  }
}
