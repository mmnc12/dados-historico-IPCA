import express from 'express';
import { calcularReajuste, filtrarPorAno, filtrarPorId, retornaTodosIpca } from './servicos/servicos.js';

const app = express();

app.get('/historicoIPCA', (req, res) => {
  const anoIpca = req.query.ano ? Number(req.query.ano) : null;

  if (anoIpca) {
    const ipcaAno = filtrarPorAno(anoIpca);
    if (ipcaAno.length > 0) {
      res.json(ipcaAno);
    } else {
      res.status(404).json({ mensgem: 'Nunhum histórico encontrado para o ano especificado' })
    }
  } else {
    const ipca = retornaTodosIpca();
    res.json(ipca);
  }
});


app.get('/historicoIPCA/calculo', (req, res) => {
  const valor = parseFloat(req.query.valor);
  const anoInicial = parseInt(req.query.anoInicial);
  const mesInicial = parseInt(req.query.mesInicial);
  const anoFinal = parseInt(req.query.anoFinal);
  const mesFinal = parseInt(req.query.mesFinal);

  const calculo = calcularReajuste(valor, anoInicial, mesInicial, anoFinal, mesFinal);

  if (
    isNaN(valor) || isNaN(anoInicial) || isNaN(mesInicial) || isNaN(anoFinal) || isNaN(mesFinal) ||
    valor <= 0 || anoInicial < 1900 || anoFinal < 1900 || anoInicial > anoFinal || mesInicial > mesFinal || mesInicial > 12 || mesFinal > 12 || mesInicial < 1 || mesFinal < 1 || anoInicial <= 2014 || anoFinal > 2023
  ) {
    res.status(400).json({ erro: 'Parâmetro inválido' })
  } else if ((anoInicial === 2023 || anoFinal === 2023) && (mesInicial > 5 || mesFinal > 5)) {
    res.status(400).json({ erro: 'Parâmetros inválidos'})
  } else {
    res.json({ Resultado: calculo });
  }
});


app.get('/historicoIPCA/:id', (req, res) => {
  const id = Number(req.params.id);

  const ipca = filtrarPorId(id);
  if (ipca) {
    res.json(ipca);
  } else {
    res.status(404).json({ erro: 'Elemento não encontrado' });
  }

});


app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080')
});