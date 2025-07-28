class ServicoCalculoFatura {
  constructor(fatura, pecas) {
    this.fatura = fatura;
    this.pecas = pecas;
  }

  calcularTotalFatura() {
    let totalFatura = 0;
    for (let apre of this.fatura.apresentacoes) {
      totalFatura += this.calcularTotalApresentacao(apre);
    }
    return totalFatura;
  }

  calcularTotalCreditos() {
    let creditos = 0;
    for (let apre of this.fatura.apresentacoes) {
      creditos += this.calcularCredito(apre);
    }
    return creditos;
  }

  calcularCredito(apre) {
    let creditos = 0;
    creditos += Math.max(apre.audiencia - 30, 0);
    if (this.getPeca(apre).tipo === "comedia")
      creditos += Math.floor(apre.audiencia / 5);
    return creditos;
  }

  getPeca(apre) {
    return this.pecas[apre.id];
  }

  calcularTotalApresentacao(apre) {
    let total = 0;
    const peca = this.getPeca(apre);
    switch (peca.tipo) {
      case "tragedia":
        total = 40000;
        if (apre.audiencia > 30) {
          total += 1000 * (apre.audiencia - 30);
        }
        break;
      case "comedia":
        total = 30000;
        if (apre.audiencia > 20) {
          total += 10000 + 500 * (apre.audiencia - 20);
        }
        total += 300 * apre.audiencia;
        break;
      default:
        throw new Error(`Peça desconhecida: ${peca.tipo}`);
    }
    return total;
  }

  formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(valor / 100);
  }
}

module.exports = { ServicoCalculoFatura };

