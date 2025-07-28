const { formatarMoeda } = require('./util');

function gerarFaturaStr(fatura, calc) {
  let faturaStr = `Fatura ${fatura.cliente}\n`;

  for (let apre of fatura.apresentacoes) {
    const nome = calc.repo.getPeca(apre).nome;
    const valor = formatarMoeda(calc.calcularTotalApresentacao(apre));
    faturaStr += `  ${nome}: ${valor} (${apre.audiencia} assentos)\n`;
  }

  faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura))}\n`;
  faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(fatura)} \n`;

  return faturaStr;
}

function gerarFaturaHtml(fatura, calc) {
  let html = `<html>\n`;
  html += `<p> Fatura ${fatura.cliente} </p>\n`;
  html += `<ul>\n`;

  for (let apre of fatura.apresentacoes) {
    const nome = calc.repo.getPeca(apre).nome;
    const valor = formatarMoeda(calc.calcularTotalApresentacao(apre));
    html += `<li>  ${nome}: ${valor} (${apre.audiencia} assentos) </li>\n`;
  }

  html += `</ul>\n`;
  html += `<p> Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura))} </p>\n`;
  html += `<p> Créditos acumulados: ${calc.calcularTotalCreditos(fatura)} </p>\n`;
  html += `</html>`;

  return html;
}

module.exports = { gerarFaturaStr, gerarFaturaHtml };