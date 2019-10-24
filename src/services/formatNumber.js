/* Função para formatar números em padrão Brasileiro */
export default function FormatNumber( number ) {
  return new Intl.NumberFormat('pt-BR').format(number)
}
