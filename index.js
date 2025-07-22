const { readFileSync } = require('fs');

function gerarFaturaStr (fatura, pecas) {
    let faturaStr = `Fatura ${fatura.cliente}\n`;
    faturaStr = `Fatura ${fatura.cliente}\n`;
    for (let apre of fatura.apresentacoes) {
        faturaStr += `  ${getPeca(apre, pecas).nome}: ${formatarMoeda(calcularTotalApresentacao(apre, pecas))} (${apre.audiencia} assentos)\n`;
    }
    faturaStr += `Valor total: ${formatarMoeda(calcularTotalFatura(fatura.apresentacoes, pecas))}\n`;
    faturaStr += `Créditos acumulados: ${calcularTotalCreditos(fatura.apresentacoes, pecas)} \n`;
    
    return faturaStr;
  }

  function calcularTotalFatura(pecas, apresentacoes) { 
    let faturaStr = 0
    for (let apre of apresentacoes) {
      const total = calcularTotalApresentacao(apre, pecas);
      faturaStr += `  ${getPeca(apre).nome}: ${formatarMoeda(total)} (${apre.audiencia} assentos)\n`;
      totalFatura += total;
    }
    return totalFatura;
  }

  function calcularTotalCreditos (pecas, apresentacoes) {
    let creditos = 0
    for (let apre of apresentacoes) {
      creditos += calcularCredito(apre, pecas);
    }
    return creditos;
  }

  function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR",
      { style: "currency", currency: "BRL",
        minimumFractionDigits: 2 }).format(valor/100);
  }

  function calcularCredito(apre, pecas) {
    let creditos = 0;
    creditos += Math.max(apre.audiencia - 30, 0);
    if (getPeca(apre, pecas).tipo === "comedia") 
       creditos += Math.floor(apre.audiencia / 5);
    return creditos;   
  }

  function getPeca(apresentacao, pecas) {
    return pecas[apresentacao.id];
  }

  function calcularTotalApresentacao(apre, pecas) {
    let total = 0;
    const peca = getPeca(apre, pecas)
    switch (getPeca(apresentacoes).tipo) {
      case "tragedia":
        total = 40000;
        if (apre.audiencia > 30) {
          total += 1000 * (apre.audiencia - 30);
        }
        break;
      case "comedia":
        total = 30000;
        if (apresentacoes.audiencia > 20) {
            total += 10000 + 500 * (apresentacoes.audiencia - 20);
        }
        total += 300 * apresentacoes.audiencia;
        break;
      default:
          throw new Error(`Peça desconhecia: ${getPeca(apresentacoes).tipo}`);
        }
        return total;
  }

const faturas = JSON.parse(readFileSync('./faturas.json'));
const pecas = JSON.parse(readFileSync('./pecas.json'));
const faturaStr = gerarFaturaStr(faturas, pecas);
console.log(faturaStr);
