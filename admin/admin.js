import Storage from "../src/services/Storage.js";
import perguntasPadrao from "../src/data/Questions.js";

// Proteção simples por senha (não é segurança real — só impede acesso casual,
// já que é um site estático sem servidor/backend).
const HASH_SENHA = "b00250e7e9759b4fff00d370a3b467864e7b028fa211a4c0e5f29e30ae79c51f";

async function sha256(texto) {
    const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(texto));
    return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, "0")).join("");
}

async function autenticar() {
    if (sessionStorage.getItem("admin_autenticado") === "1") return true;

    const senha = prompt("Senha do painel admin:");
    if (senha === null) return false;

    const hash = await sha256(senha);
    if (hash === HASH_SENHA) {
        sessionStorage.setItem("admin_autenticado", "1");
        return true;
    }

    alert("Senha incorreta.");
    return false;
}

const ok = await autenticar();
if (!ok) {
    document.getElementById("app").innerHTML = `
        <header><h1>Acesso negado</h1></header>
        <p>Senha incorreta ou não informada.</p>
        <p><a href="../index.html">← Voltar ao jogo</a></p>
    `;
    throw new Error("Acesso não autorizado ao admin");
}

Storage.init(perguntasPadrao);

const app = document.getElementById("app");
let categoriaSelecionada = null;
let editandoIndice = null; // índice da pergunta em edição, ou null

function render() {
    const categorias = Storage.getCategorias();
    if (!categoriaSelecionada || !categorias.find(c => c.id === categoriaSelecionada)) {
        categoriaSelecionada = categorias[0]?.id || null;
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
            <legend>Categorias</legend>
            <select id="select-categoria">
                ${categorias.map(c => `<option value="${c.id}" ${c.id === categoriaSelecionada ? "selected" : ""}>${c.nome}</option>`).join("")}
            </select>
            ${categoriaSelecionada ? `
                <input id="cat-renomear" placeholder="Renomear categoria" value="${nomeDaCategoria(categoriaSelecionada)}">
                <button id="btn-renomear-categoria">Salvar novo nome</button>
                <button id="btn-remover-categoria">Excluir esta categoria (e todas as perguntas dela)</button>
            ` : "<p>Nenhuma categoria ainda.</p>"}
        </fieldset>

        ${categoriaSelecionada ? `
        <fieldset>
            <legend>Perguntas de "${nomeDaCategoria(categoriaSelecionada)}"</legend>
            <div id="lista-perguntas"></div>
        </fieldset>

        <fieldset>
            <legend id="titulo-form-pergunta">${editandoIndice === null ? "Nova pergunta" : `Editando pergunta ${editandoIndice + 1}`}</legend>
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
            <button id="btn-salvar-pergunta">${editandoIndice === null ? "Adicionar pergunta" : "Salvar edição"}</button>
            ${editandoIndice !== null ? `<button id="btn-cancelar-edicao">Cancelar edição</button>` : ""}
        </fieldset>
        ` : ""}
    `;

    if (categoriaSelecionada) {
        renderListaPerguntas();
        preencherFormularioSeEditando();
    }

    document.getElementById("btn-add-categoria").onclick = () => {
        const id = document.getElementById("cat-id").value.trim().toLowerCase().replace(/\s+/g, "-");
        const nome = document.getElementById("cat-nome").value.trim();
        if (!id || !nome) return alert("Preencha id e nome da categoria.");
        Storage.adicionarCategoria(id, nome);
        categoriaSelecionada = id;
        editandoIndice = null;
        render();
    };

    document.getElementById("select-categoria").onchange = (e) => {
        categoriaSelecionada = e.target.value;
        editandoIndice = null;
        render();
    };

    if (categoriaSelecionada) {
        document.getElementById("btn-renomear-categoria").onclick = () => {
            const novoNome = document.getElementById("cat-renomear").value.trim();
            if (!novoNome) return;
            Storage.renomearCategoria(categoriaSelecionada, novoNome);
            render();
        };

        document.getElementById("btn-remover-categoria").onclick = () => {
            if (!confirm(`Excluir a categoria "${nomeDaCategoria(categoriaSelecionada)}" e todas as suas perguntas?`)) return;
            Storage.removerCategoria(categoriaSelecionada);
            categoriaSelecionada = null;
            editandoIndice = null;
            render();
        };

        document.getElementById("btn-salvar-pergunta").onclick = () => {
            const texto = document.getElementById("p-texto").value.trim();
            const alternativas = [0, 1, 2, 3].map(i => document.getElementById(`p-alt-${i}`).value.trim());
            const correta = parseInt(document.getElementById("p-correta").value, 10);

            if (!texto || alternativas.some(a => !a)) {
                return alert("Preencha a pergunta e as 4 alternativas.");
            }

            const pergunta = { texto, alternativas, correta };
            if (editandoIndice === null) {
                Storage.adicionarPergunta(categoriaSelecionada, pergunta);
            } else {
                Storage.editarPergunta(categoriaSelecionada, editandoIndice, pergunta);
            }
            editandoIndice = null;
            render();
        };

        const btnCancelar = document.getElementById("btn-cancelar-edicao");
        if (btnCancelar) {
            btnCancelar.onclick = () => {
                editandoIndice = null;
                render();
            };
        }
    }
}

function nomeDaCategoria(id) {
    const cat = Storage.getCategorias().find(c => c.id === id);
    return cat ? cat.nome : id;
}

function preencherFormularioSeEditando() {
    if (editandoIndice === null) return;
    const pergunta = Storage.getPerguntas(categoriaSelecionada)[editandoIndice];
    if (!pergunta) return;
    document.getElementById("p-texto").value = pergunta.texto;
    pergunta.alternativas.forEach((a, i) => {
        document.getElementById(`p-alt-${i}`).value = a;
    });
    document.getElementById("p-correta").value = pergunta.correta;
}

function renderListaPerguntas() {
    const container = document.getElementById("lista-perguntas");
    const perguntas = Storage.getPerguntas(categoriaSelecionada);

    if (perguntas.length === 0) {
        container.innerHTML = "<p>Nenhuma pergunta nesta categoria.</p>";
        return;
    }

    container.innerHTML = perguntas.map((p, i) => `
        <div class="lista-item">
            <span>${i + 1}. ${p.texto}</span>
            <span>
                <button data-editar="${i}" style="width:auto;background:#2563eb;">Editar</button>
                <button data-excluir="${i}">Excluir</button>
            </span>
        </div>
    `).join("");

    container.querySelectorAll("[data-editar]").forEach(btn => {
        btn.onclick = () => {
            editandoIndice = parseInt(btn.dataset.editar, 10);
            render();
        };
    });

    container.querySelectorAll("[data-excluir]").forEach(btn => {
        btn.onclick = () => {
            const indice = parseInt(btn.dataset.excluir, 10);
            if (!confirm("Excluir esta pergunta?")) return;
            Storage.removerPergunta(categoriaSelecionada, indice);
            if (editandoIndice === indice) editandoIndice = null;
            render();
        };
    });
}

render();
