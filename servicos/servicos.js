import historicoInflacao from "../dados/dados.js";

export const retornaTodosIpca = () => {
  return historicoInflacao;
}

export const filtrarPorAno = (ano) => {
  return historicoInflacao.filter(ipca => ipca.ano === ano);
}

export const filtrarPorId = (id) => {
  return historicoInflacao.find(ipca => ipca.id === id);
}

export const calcularReajuste = (valor, anoInicial, mesInicial, anoFinal, mesFinal) => {
  let resultado = valor;

  for (let i = 0; i < historicoInflacao.length; i++) {
    const entrada = historicoInflacao[i];

    if (
      (entrada.ano > anoInicial || (entrada.ano === anoInicial && entrada.mes >= mesInicial)) &&
      (entrada.ano < anoFinal || (entrada.ano === anoFinal && entrada.mes <= mesFinal))
    ) {
      resultado *= (1 + entrada.ipca / 100);
    }
  }

  return resultado.toFixed(2);
}

