export enum EstadosSolicitacao {
  NOVA = 1,
  REDIRECIONADA = 2,
  ORCADA = 3,
  REJEITADA = 4,
  APROVADA = 5,
  ARRUMADA = 6,
  FINALIZADA = 7,
  PAGA = 8
}

export function translateEstado(estd: EstadosSolicitacao): string {
  switch(estd) {
    case 1:
      return "Nova";
    case 2:
      return "Redirecionada";
    case 3:
      return "Orçada";
    case 4:
      return "Rejeitada";
    case 5:
      return "Aprovada";
    case 6:
      return "Arrumada";
    case 7:
      return "Finalizada";
    case 8:
      return "Paga";
    default:
      return "";
  }
}