import TriviaEngine from "./core/Engine.js";
import UI from "./ui/UI.js";
import Storage from "./services/Storage.js";
import perguntasPadrao from "./data/Questions.js";

Storage.init(perguntasPadrao);

const engine = new TriviaEngine({
    perguntasPorPartida: 10,
    embaralharPerguntas: true,
    embaralharAlternativas: true,
    tempoPorPergunta: 20,
    vidas: 3
});

const ui = new UI(engine, Storage);
ui.telaCategorias();

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js").catch(() => {});
    });
}
