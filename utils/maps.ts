export const monthMap: Record<string, string> = {
  '01': 'Janeiro',
  '02': 'Fevereiro',
  '03': 'Março',
  '04': 'Abril',
  '05': 'Maio',
  '06': 'Junho',
  '07': 'Julho',
  '08': 'Agosto',
  '09': 'Setembro',
  '10': 'Outubro',
  '11': 'Novembro',
  '12': 'Dezembro'
};

export const statusMap: Record<string, string> = {
  PENDING: 'PENDENTE',
  REJECTED: 'REJEITADO',
  ACCEPTED: 'ACEITO'
};

export const convertStatusLabel = (status: string | undefined) => {
  if (status) {
    const newStatusLabel = statusMap[status];

    return newStatusLabel;
  }
};

export const registryTypeMap: Record<string, string> = {
  start: 'Entrada',
  end: 'Saída',
  interval_start: 'Início intervalo',
  interval_end: 'Fim intervalo'
};

export const convertRegistryType = (registryType: string | undefined) => {
  if (registryType) {
    const newStatusLabel = registryTypeMap[registryType];

    return newStatusLabel;
  }
};
