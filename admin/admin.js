import Storage from "../src/services/Storage.js";
import perguntasPadrao from "../src/data/Questions.js";

Storage.init(perguntasPadrao);

const app = document.getElementById("app");
let categoriaSelecionada = null;

function render() {
    const categorias = Storage.getCategorias();
    if (!categoriaSelecionada && categorias.length) {
        categoriaSelecionada = categorias[0].id;
    }

    app.innerHTML = `
        <header>
            <h1>Painel Admin</h1>
            <p><a href="../index.html">← Voltar ao jogo</a></p>
        </header>

        <fieldset>
            <legend>Nova categoria</legend>
            <input id="cat-id" placeholder="id (ex: filmes, sem espaços)">
            <input id="cat-nome" placeholder="nome exibido (ex: Filmes)">
            <button id="btn-add-categoria">Adicionar categoria</button>
        </fieldset>

        <fieldset>
            <legend>Perguntas</legend>
            <select id="select-categoria">
                ${categorias.map(c => `<option value="${c.id}" ${c.id === categoriaSelecionada ? "selected" : ""}>${c.nome}</option>`).join("")}
            </select>
            <div id="lista-perguntas"></div>
        </fieldset>

        <fieldset>
            <legend>Nova pergunta</legend>
            <textarea id="p-texto" placeholder="Texto da pergunta"></textarea>
            <input id="p-alt-0" placeholder="Alternativa 1">
            <input id="p-alt-1" placeholder="Alternativa 2">
            <input id="p-alt-2" placeholder="Alternativa 3">
            <input id="p-alt-3" placeholder="Alternativa 4">
            <select id="p-correta">
                <option value="0">Correta: Alternativa 1</option>
                <option value="1">Correta: Alternativa 2</option>
                <option value="2">Correta: Alternativa 3</option>
                <option value="3">Correta: Alternativa 4</option>
            </select>
            <button id="btn-add-pergunta">Adicionar pergunta</button>
        </fieldset>
    `;

    renderListaPerguntas();

    document.getElementById("btn-add-categoria").onclick = () => {
        const id = document.getElementById("cat-id").value.trim().toLowerCase().replace(/\s+/g, "-");
        const nome = document.getElementById("cat-nome").value.trim();
        if (!id || !nome) return alert("Preencha id e nome da categoria.");
        Storage.adicionarCategoria(id, nome);
        categoriaSelecionada = id;
        render();
    };

    document.getElementById("select-categoria").onchange = (e) => {
        categoriaSelecionada = e.target.value;
        renderListaPerguntas();
    };

    document.getElementById("btn-add-pergunta").onclick = () => {
        const texto = document.getElementById("p-texto").value.trim();
        const alternativas = [0, 1, 2, 3].map(i => document.getElementById(`p-alt-${i}`).value.trim());
        const correta = parseInt(document.getElementById("p-correta").value, 10);

        if (!texto || alternativas.some(a => !a)) {
            return alert("Preencha a pergunta e as 4 alternativas.");
        }
        if (!categoriaSelecionada) {
            return alert("Crie uma categoria primeiro.");
        }

        Storage.adicionarPergunta(categoriaSelecionada, { texto, alternativas, correta });
        render();
    };
}

function renderListaPerguntas() {
    const container = document.getElementById("lista-perguntas");
    const perguntas = (window.bancoPerguntas[categoriaSelecionada] || []);

    if (perguntas.length === 0) {
        container.innerHTML = "<p>Nenhuma pergunta nesta categoria.</p>";
        return;
    }

    container.innerHTML = perguntas.map((p, i) => `
        <div class="lista-item">
            <span>${p.texto}</span>
        </div>
    `).join("");
}

render();
