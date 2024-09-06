const animaisValidos = {
    'LEAO': { tamanho: 3, bioma: 'savana' },
    'LEOPARDO': { tamanho: 2, bioma: 'savana' },
    'CROCODILO': { tamanho: 3, bioma: 'rio' },
    'MACACO': { tamanho: 1, bioma: 'savana ou floresta' },
    'GAZELA': { tamanho: 2, bioma: 'savana' },
    'HIPOPOTAMO': { tamanho: 4, bioma: 'savana ou rio' }
};

const recintos = [
    { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 2 }] },
    { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
    { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
    { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
    { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
];

class RecintosZoo {
    analisaRecintos(animal, quantidade) {
        const resultado = { erro: null, recintosViaveis: null };
 
 
        if (!animaisValidos[animal]) {
            resultado.erro = 'Animal inválido';
            return resultado;
        }
 
        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            resultado.erro = 'Quantidade inválida';
            return resultado;
        }

        const recintosViaveis = this.obterRecintosViaveis(animal, quantidade);
 
        if (recintosViaveis.length === 0) {
            resultado.erro = 'Não há recinto viável';
        } else {
            resultado.recintosViaveis = recintosViaveis
        }

        return resultado;
    }

    obterRecintosViaveis(animal, quantidade) {
        const recintosViaveis = [];

      
        const { tamanho, bioma } = animaisValidos[animal];

        
        recintos.forEach(recinto => {
     
            const capacidadeOcupada = this.calcularCapacidadeOcupada(recinto, animal);

             
            const capacidadeRestante = recinto.tamanhoTotal - capacidadeOcupada;

           
            const biomasAnimal = bioma.split(' ou ').map(b => b.trim());

            if (biomasAnimal.includes(recinto.bioma) && capacidadeRestante >= quantidade * tamanho) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${capacidadeRestante - quantidade * tamanho} total: ${recinto.tamanhoTotal})`);
            }
        });

        return recintosViaveis;
    }

    calcularCapacidadeOcupada(recinto, especieSeraAdicionada) {
        let temMaisUmaEspecie = false;

        const quatidadeOcupadaSemEspacoExtra = recinto.animais.reduce((acumulado, a) => {
            temMaisUmaEspecie = temMaisUmaEspecie || especieSeraAdicionada !== a.especie;
            return acumulado + a.quantidade * animaisValidos[a.especie].tamanho;
        }, 0);

        const espacoExtra = (temMaisUmaEspecie ? 1 : 0);
        const quantidadeOcupada = quatidadeOcupadaSemEspacoExtra + espacoExtra;

        return quantidadeOcupada;
    }
}

export { RecintosZoo };
