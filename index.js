const { readFileSync } = require('fs');
const { ServicoCalculoFatura } = require('./ServicoCalculoFatura');
const { Repositorio } = require('./Repositorio');
const { gerarFaturaStr, gerarFaturaHtml } = require('./apresentacao');

const faturas = JSON.parse(readFileSync('./faturas.json'));
const calc = new ServicoCalculoFatura(new Repositorio());
const faturaStr = gerarFaturaStr(faturas, calc);
const faturaHtml = gerarFaturaHtml(faturas, calc);
console.log(faturaStr);
console.log(faturaHtml);