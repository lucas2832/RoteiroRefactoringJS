const { readFileSync } = require('fs');
const { ServicoCalculoFatura } = require('./ServicoCalculoFatura');

function gerarFaturaStr(fatura, pecas) {
  const servico = new ServicoCalculoFatura(fatura, pecas);
  let faturaStr = `Fatura ${fatura.cliente}\n`;

  for (let apre of fatura.apresentacoes) {
    const nome = servico.getPeca(apre).nome;
    const valor = servico.formatarMoeda(servico.calcularTotalApresentacao(apre));
    faturaStr += `  ${nome}: ${valor} (${apre.audiencia} assentos)\n`;
  }

  faturaStr += `Valor total: ${servico.formatarMoeda(servico.calcularTotalFatura())}\n`;
  faturaStr += `Créditos acumulados: ${servico.calcularTotalCreditos()} \n`;

  return faturaStr;
}

function gerarFaturaHtml(fatura, pecas) {
  const servico = new ServicoCalculoFatura(fatura, pecas);
  let html = `<html>\n`;
  html += `<p> Fatura ${fatura.cliente} </p>\n`;
  html += `<ul>\n`;

  for (let apre of fatura.apresentacoes) {
    const nome = servico.getPeca(apre).nome;
    const valor = servico.formatarMoeda(servico.calcularTotalApresentacao(apre));
    html += `<li>  ${nome}: ${valor} (${apre.audiencia} assentos) </li>\n`;
  }

  html += `</ul>\n`;
  html += `<p> Valor total: ${servico.formatarMoeda(servico.calcularTotalFatura())} </p>\n`;
  html += `<p> Créditos acumulados: ${servico.calcularTotalCreditos()} </p>\n`;
  html += `</html>`;

  return html;
}

const faturas = JSON.parse(readFileSync('./faturas.json'));
const pecas = JSON.parse(readFileSync('./pecas.json'));

console.log(gerarFaturaStr(faturas, pecas));
console.log(gerarFaturaHtml(faturas, pecas));