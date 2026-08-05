// Camada de persistência (localStorage).
// Todo o banco de perguntas (padrão + criado no admin) vive em uma única
// chave no localStorage, o que permite editar/excluir qualquer pergunta ou
// categoria (inclusive as que vieram de Questions.js).

const CHAVES = {
    banco: "trivia_banco",
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

    // ---------- Inicialização ----------

    // Na primeira vez, copia as perguntas padrão (Questions.js) pro localStorage.
    // Nas próximas vezes, usa o que já está salvo (preservando edições do admin),
    // só adicionando categorias novas que tenham surgido no código.
    static init(perguntasPadrao) {
        let banco = ler(CHAVES.banco, null);

        if (!banco) {
            banco = {};
            Object.entries(perguntasPadrao).forEach(([id, cat]) => {
                banco[id] = { nome: cat.nome, perguntas: JSON.parse(JSON.stringify(cat.perguntas)) };
            });
        } else {
            Object.entries(perguntasPadrao).forEach(([id, cat]) => {
                if (!banco[id]) {
                    banco[id] = { nome: cat.nome, perguntas: JSON.parse(JSON.stringify(cat.perguntas)) };
                }
            });
        }

        this._banco = banco;
        escrever(CHAVES.banco, banco);
        this._publicarBancoGlobal();
    }

    static _publicarBancoGlobal() {
        const flat = {};
        Object.entries(this._banco).forEach(([id, cat]) => {
            flat[id] = cat.perguntas;
        });
        window.bancoPerguntas = flat;
    }

    static _salvar() {
        escrever(CHAVES.banco, this._banco);
        this._publicarBancoGlobal();
    }

    // ---------- Categorias ----------

    static getCategorias() {
        return Object.entries(this._banco).map(([id, cat]) => ({ id, nome: cat.nome }));
    }

    static adicionarCategoria(id, nome) {
        if (!this._banco[id]) {
            this._banco[id] = { nome, perguntas: [] };
            this._salvar();
        }
    }

    static renomearCategoria(id, novoNome) {
        if (this._banco[id]) {
            this._banco[id].nome = novoNome;
            this._salvar();
        }
    }

    static removerCategoria(id) {
        delete this._banco[id];
        this._salvar();
    }

    // ---------- Perguntas ----------

    static getPerguntas(categoriaId) {
        return (this._banco[categoriaId] && this._banco[categoriaId].perguntas) || [];
    }

    static adicionarPergunta(categoriaId, pergunta) {
        if (!this._banco[categoriaId]) return;
        this._banco[categoriaId].perguntas.push(pergunta);
        this._salvar();
    }

    static editarPergunta(categoriaId, indice, pergunta) {
        const cat = this._banco[categoriaId];
        if (cat && cat.perguntas[indice]) {
            cat.perguntas[indice] = pergunta;
            this._salvar();
        }
    }

    static removerPergunta(categoriaId, indice) {
        const cat = this._banco[categoriaId];
        if (cat && cat.perguntas[indice] !== undefined) {
            cat.perguntas.splice(indice, 1);
            this._salvar();
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
