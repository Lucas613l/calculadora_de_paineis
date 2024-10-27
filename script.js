function calcularPaineis() {
    const consumoMensal = parseFloat(document.getElementById('consumo').value.replace(',', '.'));
    const irradiacaoDiaria = parseFloat(document.getElementById('irradiacao').value.replace(',', '.'));
    const potenciaPainel = parseFloat(document.getElementById('potencia').value.replace(',', '.'));
    const eficienciaPainel = parseFloat(document.getElementById('eficiencia').value.replace(',', '.')) / 100;

    if (isNaN(consumoMensal) || isNaN(irradiacaoDiaria) || isNaN(potenciaPainel) || isNaN(eficienciaPainel)) {
        document.getElementById('resultado').innerHTML = "Por favor, preencha todos os campos corretamente.";
        return;
    }

    // Geração mensal de energia por painel em kWh
const geracaoPainelMensal = (potenciaPainel / 1000) * irradiacaoDiaria * 30 * (eficienciaPainel / 100);
    // Número de painéis necessários (arredondando para baixo)
    const numPaineis = Math.floor(consumoMensal / geracaoPainelMensal);
    
    // Área necessária para instalação (média de 1,7m² por painel)
    const areaPorPainel = 1.7; 
    const areaTotal = numPaineis * areaPorPainel;

    // Estimativa de economia anual na conta de energia
    const custoMensalEnergia = 0.7; 
    const economiaMensal = consumoMensal * custoMensalEnergia;
    const economiaAnual = economiaMensal * 12;

    // Mensagem de saída
    let mensagem = `
        Você precisará de aproximadamente ${numPaineis.toLocaleString()} painéis solares para cobrir seu consumo mensal.
        <br>Área necessária para instalação: ${areaTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })} m²
        <br>Economia anual estimada: ${economiaAnual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}.
    `;

    // Alerta de consumo elevado
    if (consumoMensal > 1000) {
        mensagem += "<br><span class='alerta'>Consumo elevado: recomendamos consultar um especialista.</span>";
    }

    document.getElementById('resultado').innerHTML = mensagem;
}
