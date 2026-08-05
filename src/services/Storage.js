// Camada de persistência (localStorage).
// Junta perguntas padrão (Questions.js) + perguntas/categorias criadas no admin,
// e monta o "bancoPerguntas" global que o Engine.js espera encontrar.

const CHAVES = {
    categoriasCustom: "trivia_categorias_custom",
    ranking: "trivia_ranking",
    progresso: "trivia_progresso"
};

function ler(chave, padrao) {
    try {
        const bruto = localStorage.getItem(chave);
        return bruto ? JSON.parse(bruto) : padrao;
    } catch (e) {
        return padrao;
    }
}

function escrever(chave, valor) {
    try {
        localStorage.setItem(chave, JSON.stringify(valor));
        return true;
    } catch (e) {
        return false;
    }
}

export default class Storage {

    // ---------- Categorias / Perguntas ----------

    // Combina categorias padrão (Questions.js) com as customizadas (admin)
    // e publica window.bancoPerguntas no formato { catId: [ {alternativas, correta}, ... ] }
    static init(perguntasPadrao) {
        this.padrao = perguntasPadrao;
        this._reconstruirBanco();
    }

    static _categoriasCustom() {
        return ler(CHAVES.categoriasCustom, {});
    }

    static _reconstruirBanco() {
        const custom = this._categoriasCustom();
        const banco = {};
        const categorias = [];

        Object.entries(this.padrao || {}).forEach(([id, cat]) => {
            categorias.push({ id, nome: cat.nome, origem: "padrao" });
            banco[id] = [...cat.perguntas];
        });

        Object.entries(custom).forEach(([id, cat]) => {
            const existente = categorias.find(c => c.id === id);
            if (existente) {
                banco[id] = [...(banco[id] || []), ...(cat.perguntas || [])];
            } else {
                categorias.push({ id, nome: cat.nome, origem: "admin" });
                banco[id] = [...(cat.perguntas || [])];
            }
        });

        window.bancoPerguntas = banco;
        this._categorias = categorias;
    }

    static getCategorias() {
        return this._categorias || [];
    }

    static adicionarCategoria(id, nome) {
        const custom = this._categoriasCustom();
        if (!custom[id]) {
            custom[id] = { nome, perguntas: [] };
        }
        escrever(CHAVES.categoriasCustom, custom);
        this._reconstruirBanco();
    }

    static adicionarPergunta(categoriaId, pergunta) {
        const custom = this._categoriasCustom();
        if (!custom[categoriaId]) {
            const meta = this._categorias.find(c => c.id === categoriaId);
            custom[categoriaId] = { nome: meta ? meta.nome : categoriaId, perguntas: [] };
        }
        custom[categoriaId].perguntas.push(pergunta);
        escrever(CHAVES.categoriasCustom, custom);
        this._reconstruirBanco();
    }

    static removerPergunta(categoriaId, indice) {
        const custom = this._categoriasCustom();
        if (custom[categoriaId] && custom[categoriaId].perguntas[indice]) {
            custom[categoriaId].perguntas.splice(indice, 1);
            escrever(CHAVES.categoriasCustom, custom);
            this._reconstruirBanco();
        }
    }

    // ---------- Ranking ----------

    static getRanking(categoria = null) {
        const ranking = ler(CHAVES.ranking, []);
        const filtrado = categoria ? ranking.filter(r => r.categoria === categoria) : ranking;
        return filtrado.sort((a, b) => b.pontos - a.pontos).slice(0, 20);
    }

    static salvarResultado(nome, categoria, pontos) {
        const ranking = ler(CHAVES.ranking, []);
        ranking.push({
            nome: nome || "Jogador",
            categoria,
            pontos,
            data: new Date().toISOString()
        });
        escrever(CHAVES.ranking, ranking);
    }

    // ---------- Progresso do jogador ----------

    static getProgresso() {
        return ler(CHAVES.progresso, {
            partidasJogadas: 0,
            melhorPontuacao: {},
            historico: []
        });
    }

    static salvarProgresso(estatisticas) {
        const progresso = this.getProgresso();
        progresso.partidasJogadas++;

        const cat = estatisticas.categoria;
        const atual = progresso.melhorPontuacao[cat] || 0;
        if (estatisticas.pontuacao > atual) {
            progresso.melhorPontuacao[cat] = estatisticas.pontuacao;
        }

        progresso.historico.unshift({
            categoria: cat,
            pontuacao: estatisticas.pontuacao,
            acertos: estatisticas.acertos,
            erros: estatisticas.erros,
            data: new Date().toISOString()
        });
        progresso.historico = progresso.historico.slice(0, 50);

        escrever(CHAVES.progresso, progresso);
    }
}
