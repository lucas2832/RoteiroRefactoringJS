const { readFileSync } = require('fs');
const { ServicoCalculoFatura } = require('./ServicoCalculoFatura');
const { Repositorio } = require('./Repositorio');

function gerarFaturaStr(fatura, calc) {
  let faturaStr = `Fatura ${fatura.cliente}\n`;

  for (let apre of fatura.apresentacoes) {
    const nome = calc.repo.getPeca(apre).nome;
    const valor = calc.formatarMoeda(calc.calcularTotalApresentacao(apre));
    faturaStr += `  ${nome}: ${valor} (${apre.audiencia} assentos)\n`;
  }

  faturaStr += `Valor total: ${calc.formatarMoeda(calc.calcularTotalFatura(fatura))}\n`;
  faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(fatura)} \n`;

  return faturaStr;
}

function gerarFaturaHtml(fatura, calc) {
  let html = `<html>\n`;
  html += `<p> Fatura ${fatura.cliente} </p>\n`;
  html += `<ul>\n`;

  for (let apre of fatura.apresentacoes) {
    const nome = calc.repo.getPeca(apre).nome;
    const valor = calc.formatarMoeda(calc.calcularTotalApresentacao(apre));
    html += `<li>  ${nome}: ${valor} (${apre.audiencia} assentos) </li>\n`;
  }

  html += `</ul>\n`;
  html += `<p> Valor total: ${calc.formatarMoeda(calc.calcularTotalFatura(fatura))} </p>\n`;
  html += `<p> Créditos acumulados: ${calc.calcularTotalCreditos(fatura)} </p>\n`;
  html += `</html>`;

  return html;
}

const faturas = JSON.parse(readFileSync('./faturas.json'));
const calc = new ServicoCalculoFatura(new Repositorio());

console.log(gerarFaturaStr(faturas, calc));
console.log(gerarFaturaHtml(faturas, calc));