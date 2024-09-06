class RecintosZoo {
    analisaRecintos(animal, quantidade) {
        const animaisValidos = {
            LEAO: { tamanho: 3, bioma: 'savana' },
            LEOPARDO: { tamanho: 2, bioma: 'savana' },
            CROCODILO: { tamanho: 3, bioma: 'rio' },
            MACACO: { tamanho: 1, bioma: 'savana ou floresta' },
            GAZELA: { tamanho: 2, bioma: 'savana' },
            HIPOPOTAMO: { tamanho: 4, bioma: 'savana ou rio' }
        };

        const recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 2 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];

        const resultado = { erro: null, recintosViaveis: [] };

        // Verifica se o animal é válido
        if (!animaisValidos[animal]) {
            resultado.erro = 'Animal inválido';
            return resultado;
        }

        // Verifica se a quantidade é válida
        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            resultado.erro = 'Quantidade inválida';
            return resultado;
        }

        // Obtém o tamanho e bioma do animal
        const { tamanho, bioma } = animaisValidos[animal];
        
        // Verifica cada recinto
        recintos.forEach(r => {
            // Calcula a quantidade total ocupada por animais já presentes
            const capacidadeOcupada = r.animais.reduce((acc, a) => acc + (a.especie === animal ? a.quantidade * tamanho : 0), 0);
            
            // Calcula o espaço livre disponível
            const capacidadeRestante = r.tamanhoTotal - capacidadeOcupada;
            
            // Verifica se o bioma do recinto é adequado e se há espaço suficiente
            const biomasAnimal = bioma.split(' ou ').map(b => b.trim());
            if (biomasAnimal.includes(r.bioma) && capacidadeRestante >= quantidade * tamanho) {
                resultado.recintosViaveis.push(`Recinto ${r.numero} (espaço livre: ${capacidadeRestante - quantidade * tamanho} total: ${r.tamanhoTotal})`);
            }
        });

        // Se não houver recintos viáveis, define um erro
        if (resultado.recintosViaveis.length === 0) {
            resultado.erro = 'Não há recinto viável';
            resultado.recintosViaveis = []; // Garante que seja uma lista vazia
        }

        return resultado;
    }
}

export { RecintosZoo };
