// Camada de interface: liga o TriviaEngine (eventos) ao DOM.

export default class UI {

    constructor(engine, Storage) {
        this.engine = engine;
        this.Storage = Storage;
        this.root = document.getElementById("app") || document.body;
        this.categoriaAtual = null;

        this._ligarEventosEngine();
    }

    // ---------- Setup ----------

    _ligarEventosEngine() {
        this.engine.on("novaPergunta", () => {});

        this.engine.on("resposta", (resultado) => {
            this._colorirAlternativas(resultado);
            this._mostrarFeedback(resultado);
        });

        this.engine.on("tempo", (segundos) => {
            const el = document.getElementById("tempo");
            if (el) {
                el.textContent = `⏱ ${segundos}s`;
                el.classList.toggle("urgente", segundos <= 5);
            }
        });

        this.engine.on("tempoEsgotado", () => {
            this._colorirAlternativas({ acertou: false, respostaSelecionada: -1, respostaCorreta: this.engine.perguntaAtual()?.correta });
            this._mostrarFeedback({ acertou: false, tempoEsgotado: true });
        });

        this.engine.on("finalizado", (dados) => {
            this._statsFinal = dados.estatisticas;
        });
    }

    _colorirAlternativas(resultado) {
        const botoes = Array.from(document.getElementById("alternativas")?.children || []);
        botoes.forEach((btn, i) => {
            if (i === resultado.respostaCorreta) btn.classList.add("correta");
            else if (i === resultado.respostaSelecionada) btn.classList.add("errada");
        });
    }

    // ---------- Tela: Categorias ----------

    telaCategorias() {
        const categorias = this.Storage.getCategorias();

        this.root.innerHTML = `
            <div class="app">
                <header>
                    <h1>Trivia Engine</h1>
                    <p>Escolha uma categoria</p>
                </header>
                <div id="lista-categorias"></div>
                <button id="btn-ranking">🏆 Ver Ranking</button>
                <p style="text-align:center; margin-top:18px;"><a href="admin/index.html" style="color:var(--muted); font-size:12px;">painel admin</a></p>
            </div>
        `;

        const lista = document.getElementById("lista-categorias");
        if (categorias.length === 0) {
            lista.innerHTML = "<p>Nenhuma categoria disponível ainda.</p>";
        }
        categorias.forEach(cat => {
            const total = (window.bancoPerguntas[cat.id] || []).length;
            const btn = document.createElement("button");
            btn.textContent = `${cat.nome} (${total} perguntas)`;
            btn.disabled = total === 0;
            btn.onclick = () => this.iniciarPartida(cat.id);
            lista.appendChild(btn);
        });

        document.getElementById("btn-ranking").onclick = () => this.telaRanking();
    }

    // ---------- Tela: Jogo ----------

    iniciarPartida(categoriaId) {
        this.categoriaAtual = categoriaId;
        try {
            this.engine.iniciar(categoriaId);
        } catch (e) {
            alert("Não foi possível iniciar: " + e.message);
            return;
        }
        this._montarTelaJogo();
        this.renderPergunta(this.engine.perguntaAtual());
        this.engine.iniciarCronometro();
    }

    _montarTelaJogo() {
        this.root.innerHTML = `
            <div class="app">
                <header>
                    <h1>Trivia Engine</h1>
                </header>
                <div class="status">
                    <span id="pontuacao">⭐ 0</span>
                    <span id="vidas"></span>
                    <span id="tempo"></span>
                </div>
                <h2 id="pergunta"></h2>
                <div id="alternativas"></div>
                <div id="mensagem"></div>
            </div>
        `;
    }

    renderPergunta(pergunta) {
        if (!pergunta) return;

        document.getElementById("pontuacao").textContent = `⭐ ${this.engine.pontuacao()}`;
        document.getElementById("vidas").textContent = "❤️".repeat(Math.max(0, this.engine.vidas()));
        document.getElementById("pergunta").textContent = pergunta.texto || "";
        document.getElementById("mensagem").textContent = "";

        const container = document.getElementById("alternativas");
        container.innerHTML = "";
        const letras = ["A", "B", "C", "D"];
        pergunta.alternativas.forEach((alt, i) => {
            const btn = document.createElement("button");
            btn.textContent = alt;
            btn.dataset.letra = letras[i] || (i + 1);
            btn.onclick = () => this._responder(i);
            container.appendChild(btn);
        });
    }

    _responder(indice) {
        this.engine.pararCronometro();
        Array.from(document.getElementById("alternativas").children).forEach(b => b.disabled = true);
        this.engine.responder(indice);
    }

    _mostrarFeedback(resultado) {
        const msg = document.getElementById("mensagem");
        if (!msg) return;
        msg.textContent = resultado.acertou ? "✅ Acertou!" : (resultado.tempoEsgotado ? "⏰ Tempo esgotado!" : "❌ Errou!");

        setTimeout(() => {
            if (this.engine.terminou()) {
                this.telaResultado(this._statsFinal);
                return;
            }
            this.renderPergunta(this.engine.perguntaAtual());
            this.engine.iniciarCronometro();
        }, 900);
    }

    // ---------- Tela: Resultado ----------

    telaResultado(stats) {
        this.root.innerHTML = `
            <div class="app">
                <header>
                    <h1>Fim de jogo!</h1>
                </header>
                <div class="status">
                    <span>⭐ ${stats.pontuacao} pontos</span>
                </div>
                <p>Acertos: ${stats.acertos} | Erros: ${stats.erros}</p>
                <p>Maior sequência: ${stats.maiorSequencia}</p>
                <p>Aproveitamento: ${stats.percentual}%</p>
                <input id="nome-jogador" placeholder="Seu nome (para o ranking)" />
                <button id="btn-salvar">Salvar resultado</button>
                <button id="btn-jogar-novamente">Jogar novamente</button>
                <button id="btn-menu">Voltar ao menu</button>
            </div>
        `;

        this.Storage.salvarProgresso(stats);

        document.getElementById("btn-salvar").onclick = () => {
            const nome = document.getElementById("nome-jogador").value.trim();
            this.Storage.salvarResultado(nome, stats.categoria, stats.pontuacao);
            this.telaRanking(stats.categoria);
        };
        document.getElementById("btn-jogar-novamente").onclick = () => this.iniciarPartida(stats.categoria);
        document.getElementById("btn-menu").onclick = () => this.telaCategorias();
    }

    // ---------- Tela: Ranking ----------

    telaRanking(categoria = null) {
        const ranking = this.Storage.getRanking(categoria);

        this.root.innerHTML = `
            <div class="app">
                <header>
                    <h1>🏆 Ranking</h1>
                </header>
                <div id="lista-ranking"></div>
                <button id="btn-voltar">Voltar</button>
            </div>
        `;

        const lista = document.getElementById("lista-ranking");
        if (ranking.length === 0) {
            lista.innerHTML = "<p>Nenhum resultado salvo ainda.</p>";
        } else {
            lista.innerHTML = ranking
                .map((r, i) => `<p>${i + 1}. ${r.nome} — ${r.pontos} pts (${r.categoria})</p>`)
                .join("");
        }

        document.getElementById("btn-voltar").onclick = () => this.telaCategorias();
    }
}
