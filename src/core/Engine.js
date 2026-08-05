/*
===========================================================
TRIVIA ENGINE
Versão 1.0

Parte 1/5

Não altere este arquivo manualmente.
===========================================================
*/

class TriviaEngine {

    constructor(config = {}) {

        this.config = {

            perguntasPorPartida: 10,

            embaralharPerguntas: true,

            embaralharAlternativas: true,

            tempoPorPergunta: 30,

            vidas: 3,

            ...config

        };



        this.estado = {

            categoria: null,

            perguntas: [],

            perguntaAtual: 0,

            pontuacao: 0,

            vidas: this.config.vidas,

            acertos: 0,

            erros: 0,

            tempo: this.config.tempoPorPergunta,

            sequencia: 0,

            maiorSequencia: 0,

            finalizado: false

        };



        this.eventos = {};

    }



    /* =================================================== */

    on(nome, callback) {

        if (!this.eventos[nome]) {

            this.eventos[nome] = [];

        }

        this.eventos[nome].push(callback);

    }



    emit(nome, dados = null) {

        if (!this.eventos[nome]) return;

        this.eventos[nome].forEach(funcao => funcao(dados));

    }



    /* =================================================== */

    iniciar(categoria) {

        this.estado.categoria = categoria;

        this.estado.perguntaAtual = 0;

        this.estado.pontuacao = 0;

        this.estado.acertos = 0;

        this.estado.erros = 0;

        this.estado.sequencia = 0;

        this.estado.maiorSequencia = 0;

        this.estado.vidas = this.config.vidas;

        this.estado.finalizado = false;



        if (!bancoPerguntas[categoria]) {

            throw new Error("Categoria inexistente.");

        }



        this.estado.perguntas = [...bancoPerguntas[categoria]];



        if (this.config.embaralharPerguntas) {

            this.embaralhar(this.estado.perguntas);

        }



        this.estado.perguntas =

            this.estado.perguntas.slice(

                0,

                this.config.perguntasPorPartida

            );



        this.prepararPerguntas();



        this.emit("inicio", this.estado);

    }



    prepararPerguntas() {

        this.estado.perguntas.forEach(pergunta => {

            if (!this.config.embaralharAlternativas)

                return;



            const respostaCorreta =

                pergunta.alternativas[pergunta.correta];



            this.embaralhar(pergunta.alternativas);



            pergunta.correta =

                pergunta.alternativas.indexOf(respostaCorreta);

        });

    }



    embaralhar(lista) {

        for (

            let i = lista.length - 1;

            i > 0;

            i--

        ) {

            const j = Math.floor(

                Math.random() * (i + 1)

            );



            [lista[i], lista[j]] =

                [lista[j], lista[i]];

        }

    }



    perguntaAtual() {

        return this.estado.perguntas[

            this.estado.perguntaAtual

        ];

    }
    /* ===================================================
       Responder pergunta
    =================================================== */

    responder(indiceAlternativa) {

        if (this.estado.finalizado) {
            return;
        }

        const pergunta = this.perguntaAtual();

        if (!pergunta) {
            return;
        }

        const acertou = indiceAlternativa === pergunta.correta;

        const resultado = {

            acertou,
            respostaSelecionada: indiceAlternativa,
            respostaCorreta: pergunta.correta,
            pergunta,
            pontuacaoAntes: this.estado.pontuacao,
            pontuacaoDepois: 0,
            vidasAntes: this.estado.vidas,
            vidasDepois: 0

        };



        if (acertou) {

            this.estado.acertos++;

            this.estado.sequencia++;

            if (this.estado.sequencia > this.estado.maiorSequencia) {

                this.estado.maiorSequencia =
                    this.estado.sequencia;

            }

            const bonusSequencia =
                this.estado.sequencia * 10;

            this.estado.pontuacao +=
                100 + bonusSequencia;

        }

        else {

            this.estado.erros++;

            this.estado.sequencia = 0;

            this.estado.vidas--;

        }



        resultado.pontuacaoDepois =
            this.estado.pontuacao;

        resultado.vidasDepois =
            this.estado.vidas;



        this.emit("resposta", resultado);



        if (this.estado.vidas <= 0) {

            this.finalizar("sem_vidas");

            return;

        }



        this.estado.perguntaAtual++;



        if (

            this.estado.perguntaAtual >=
            this.estado.perguntas.length

        ) {

            this.finalizar("fim");

            return;

        }



        this.emit(

            "novaPergunta",

            this.perguntaAtual()

        );

    }



    /* ===================================================
       Verificações
    =================================================== */

    terminou() {

        return this.estado.finalizado;

    }



    possuiVidas() {

        return this.estado.vidas > 0;

    }



    perguntasRestantes() {

        return (

            this.estado.perguntas.length -

            this.estado.perguntaAtual

        );

    }



    progresso() {

        return {

            atual:

                this.estado.perguntaAtual + 1,

            total:

                this.estado.perguntas.length,

            percentual:

                Math.floor(

                    (

                        this.estado.perguntaAtual /

                        this.estado.perguntas.length

                    ) * 100

                )

        };

    }



    pontuacao() {

        return this.estado.pontuacao;

    }



    vidas() {

        return this.estado.vidas;

    }



    acertos() {

        return this.estado.acertos;

    }



    erros() {

        return this.estado.erros;

    }



    sequencia() {

        return this.estado.sequencia;

    }



    maiorSequencia() {

        return this.estado.maiorSequencia;

    }
    /* ===================================================
       CRONÔMETRO
    =================================================== */

    iniciarCronometro() {

        this.pararCronometro();

        this.estado.tempo = this.config.tempoPorPergunta;

        this.emit("tempo", this.estado.tempo);

        this.timer = setInterval(() => {

            this.estado.tempo--;

            this.emit("tempo", this.estado.tempo);

            if (this.estado.tempo <= 0) {

                this.pararCronometro();

                this.tempoEsgotado();

            }

        }, 1000);

    }



    pararCronometro() {

        if (this.timer) {

            clearInterval(this.timer);

            this.timer = null;

        }

    }



    pausar() {

        this.pararCronometro();

        this.emit("pausado");

    }



    continuar() {

        this.iniciarCronometro();

        this.emit("continuado");

    }



    tempoEsgotado() {

        const pergunta = this.perguntaAtual();

        if (!pergunta) return;

        this.estado.erros++;

        this.estado.sequencia = 0;

        this.estado.vidas--;

        this.emit("tempoEsgotado", {

            pergunta,

            vidas: this.estado.vidas

        });

        if (this.estado.vidas <= 0) {

            this.finalizar("tempo");

            return;

        }

        this.estado.perguntaAtual++;

        if (this.estado.perguntaAtual >= this.estado.perguntas.length) {

            this.finalizar("fim");

            return;

        }

        this.emit("novaPergunta", this.perguntaAtual());

        this.iniciarCronometro();

    }



    /* ===================================================
       CONTROLE DA PARTIDA
    =================================================== */

    reiniciar() {

        if (!this.estado.categoria) return;

        this.iniciar(this.estado.categoria);

    }



    cancelar() {

        this.pararCronometro();

        this.estado.finalizado = true;

        this.emit("cancelado");

    }



    finalizar(motivo = "fim") {

        this.pararCronometro();

        this.estado.finalizado = true;

        this.emit("finalizado", {

            motivo,

            estatisticas: this.estatisticas()

        });

    }



    /* ===================================================
       ESTATÍSTICAS
    =================================================== */

    estatisticas() {

        const total = this.estado.perguntas.length;

        const percentual = total === 0
            ? 0
            : Math.round((this.estado.acertos / total) * 100);

        return {

            categoria: this.estado.categoria,

            pontuacao: this.estado.pontuacao,

            acertos: this.estado.acertos,

            erros: this.estado.erros,

            vidas: this.estado.vidas,

            percentual,

            maiorSequencia: this.estado.maiorSequencia,

            perguntasRespondidas:
                this.estado.acertos + this.estado.erros

        };

    }
    /* ===================================================
       CONFIGURAÇÕES
    =================================================== */

    atualizarConfiguracao(novasConfiguracoes = {}) {

        this.config = {

            ...this.config,

            ...novasConfiguracoes

        };

        this.emit("configuracaoAlterada", this.config);

    }



    configuracao(nome) {

        return this.config[nome];

    }



    configuracoes() {

        return { ...this.config };

    }



    /* ===================================================
       ESTADO
    =================================================== */

    estadoAtual() {

        return structuredClone(this.estado);

    }



    restaurarEstado(estadoSalvo) {

        this.estado = structuredClone(estadoSalvo);

        this.emit("estadoRestaurado", this.estado);

    }



    /* ===================================================
       SERIALIZAÇÃO
    =================================================== */

    exportarPartida() {

        return JSON.stringify({

            versao: "1.0",

            data: new Date().toISOString(),

            estado: this.estado,

            configuracao: this.config

        });

    }



    importarPartida(json) {

        const dados = JSON.parse(json);

        this.config = dados.configuracao;

        this.estado = dados.estado;

        this.emit("partidaImportada", this.estado);

    }



    /* ===================================================
       EVENTOS
    =================================================== */

    removerEvento(nome, callback) {

        if (!this.eventos[nome]) return;

        this.eventos[nome] =

            this.eventos[nome].filter(

                fn => fn !== callback

            );

    }



    limparEventos() {

        this.eventos = {};

    }



    destruir() {

        this.pararCronometro();

        this.limparEventos();

        this.estado.finalizado = true;

    }



    /* ===================================================
       GETTERS
    =================================================== */

    categoria() {

        return this.estado.categoria;

    }



    perguntaNumero() {

        return this.estado.perguntaAtual + 1;

    }



    totalPerguntas() {

        return this.estado.perguntas.length;

    }



    perguntaAtualObjeto() {

        return this.estado.perguntas[
            this.estado.perguntaAtual
        ];

    }



    jogoFinalizado() {

        return this.estado.finalizado;

    }



    tempoRestante() {

        return this.estado.tempo;

    }



    percentualAcertos() {

        if (this.estado.acertos === 0)
            return 0;

        return Math.round(

            (this.estado.acertos /

            this.estado.perguntas.length) * 100

        );

    }
    /* ===================================================
       VALIDAÇÕES
    =================================================== */

    validarCategoria(categoria) {

        if (!categoria) {

            throw new Error(
                "Categoria não informada."
            );

        }


        if (!bancoPerguntas[categoria]) {

            throw new Error(
                "Categoria inexistente: " + categoria
            );

        }


        return true;

    }



    validarPergunta(pergunta) {

        if (!pergunta.pergunta) {

            return false;

        }


        if (!Array.isArray(pergunta.alternativas)) {

            return false;

        }


        if (
            typeof pergunta.correta !== "number"
        ) {

            return false;

        }


        return true;

    }



    limparPerguntasInvalidas() {

        this.estado.perguntas =

            this.estado.perguntas.filter(

                pergunta =>

                    this.validarPergunta(pergunta)

            );

    }



    /* ===================================================
       MODO DEBUG
    =================================================== */

    debug() {

        return {

            configuracao: this.config,

            estado: this.estado,

            perguntaAtual:
                this.perguntaAtual(),

            estatisticas:
                this.estatisticas()

        };

    }



    /* ===================================================
       INFORMAÇÕES DA ENGINE
    =================================================== */

    versao() {

        return "Trivia Engine 1.0";

    }



    informacoes() {

        return {

            nome:
                "Trivia Engine",

            versao:
                this.versao(),

            perguntas:
                this.estado.perguntas.length,

            categoria:
                this.estado.categoria

        };

    }


}


/* =======================================================
   EXPORTAÇÃO
======================================================= */

if (typeof module !== "undefined") {

    module.exports = TriviaEngine;

}

export default TriviaEngine;
