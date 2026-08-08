// Perguntas padrão (fixas no código).
// O painel admin pode adicionar categorias/perguntas por cima destas.

export default {
    geral: {
        nome: "Conhecimentos Gerais",
        perguntas: [
            { texto: "Qual é a capital do Brasil?", alternativas: ["Rio de Janeiro", "Brasília", "São Paulo", "Salvador"], correta: 1 },
            { texto: "Quantos continentes existem?", alternativas: ["5", "6", "7", "8"], correta: 2 },
            { texto: "Qual é o maior oceano do mundo?", alternativas: ["Atlântico", "Índico", "Ártico", "Pacífico"], correta: 3 },
            { texto: "Em que ano o homem pisou na Lua pela primeira vez?", alternativas: ["1965", "1969", "1971", "1975"], correta: 1 },
            { texto: "Qual é o maior país do mundo em área?", alternativas: ["China", "Canadá", "Rússia", "Estados Unidos"], correta: 2 }
        ]
    },
    ciencia: {
        nome: "Ciência",
        perguntas: [
            { texto: "Qual é o símbolo químico do ouro?", alternativas: ["Ag", "Au", "Or", "Go"], correta: 1 },
            { texto: "Qual planeta é conhecido como Planeta Vermelho?", alternativas: ["Vênus", "Júpiter", "Marte", "Saturno"], correta: 2 },
            { texto: "Quantos ossos tem o corpo humano adulto?", alternativas: ["186", "206", "226", "246"], correta: 1 },
            { texto: "Qual é a velocidade da luz (aprox.)?", alternativas: ["300.000 km/s", "150.000 km/s", "3.000 km/s", "30.000 km/s"], correta: 0 }
        ]
    },
    esportes: {
        nome: "Esportes",
        perguntas: [
            { texto: "Quantos jogadores tem um time de futebol em campo?", alternativas: ["9", "10", "11", "12"], correta: 2 },
            { texto: "Em que esporte se usa o termo 'ace'?", alternativas: ["Vôlei", "Tênis", "Basquete", "Handebol"], correta: 1 },
            { texto: "De quantos em quantos anos ocorrem as Olimpíadas?", alternativas: ["2", "3", "4", "5"], correta: 2 }
        ]
    },
    filmes: {
        nome: "Filmes e Séries",
        perguntas: [
            { texto: "Quem dirigiu a trilogia original 'O Senhor dos Anéis'?", alternativas: ["James Cameron", "Peter Jackson", "Steven Spielberg", "Ridley Scott"], correta: 1 },
            { texto: "Em que série se passa a cidade fictícia de Hawkins?", alternativas: ["Dark", "The Boys", "Stranger Things", "Wednesday"], correta: 2 },
            { texto: "Qual estúdio de animação criou 'Toy Story'?", alternativas: ["DreamWorks", "Pixar", "Illumination", "Studio Ghibli"], correta: 1 },
            { texto: "Quem interpretou o Coringa no filme de 2019 'Joker'?", alternativas: ["Jared Leto", "Heath Ledger", "Joaquin Phoenix", "Jack Nicholson"], correta: 2 },
            { texto: "Qual filme venceu o Oscar de Melhor Filme em 2020?", alternativas: ["1917", "Parasita", "Joker", "Coringa"], correta: 1 },
            { texto: "Em qual universo se passa a série 'Game of Thrones'?", alternativas: ["Westeros", "Middle-earth", "Narnia", "Panem"], correta: 0 },
            { texto: "Quem é o criador da franquia 'Star Wars'?", alternativas: ["George Lucas", "Gene Roddenberry", "James Cameron", "J.J. Abrams"], correta: 0 },
            { texto: "Qual é o sobrenome da família na série 'Succession'?", alternativas: ["Kennedy", "Roy", "Sterling", "Byrde"], correta: 1 }
        ]
    },
    musica: {
        nome: "Música",
        perguntas: [
            { texto: "Qual banda gravou o álbum 'Abbey Road'?", alternativas: ["The Rolling Stones", "The Beatles", "Pink Floyd", "Queen"], correta: 1 },
            { texto: "Quem é conhecido como o 'Rei do Pop'?", alternativas: ["Prince", "Elvis Presley", "Michael Jackson", "James Brown"], correta: 2 },
            { texto: "Qual instrumento tem 88 teclas (em geral)?", alternativas: ["Violão", "Piano", "Acordeão", "Órgão"], correta: 1 },
            { texto: "De qual país é a cantora Shakira?", alternativas: ["México", "Argentina", "Colômbia", "Espanha"], correta: 2 },
            { texto: "Qual gênero musical nasceu no Brasil, associado ao Rio de Janeiro?", alternativas: ["Fado", "Samba", "Tango", "Flamenco"], correta: 1 },
            { texto: "Quem compôs a 'Nona Sinfonia'?", alternativas: ["Mozart", "Bach", "Beethoven", "Chopin"], correta: 2 },
            { texto: "Qual desses é um festival de música brasileiro famoso?", alternativas: ["Coachella", "Rock in Rio", "Glastonbury", "Tomorrowland"], correta: 1 }
        ]
    },
    historia: {
        nome: "História",
        perguntas: [
            { texto: "Em que ano começou a Segunda Guerra Mundial?", alternativas: ["1935", "1939", "1941", "1945"], correta: 1 },
            { texto: "Quem foi o primeiro imperador do Brasil?", alternativas: ["Dom Pedro I", "Dom Pedro II", "Dom João VI", "Getúlio Vargas"], correta: 0 },
            { texto: "Em que ano o Brasil proclamou sua independência?", alternativas: ["1808", "1822", "1889", "1500"], correta: 1 },
            { texto: "Qual civilização construiu as pirâmides de Gizé?", alternativas: ["Maias", "Egípcios", "Romanos", "Astecas"], correta: 1 },
            { texto: "Quem foi o líder da Revolução Cubana em 1959?", alternativas: ["Che Guevara", "Fidel Castro", "Hugo Chávez", "Salvador Allende"], correta: 1 },
            { texto: "Em que ano caiu o Muro de Berlim?", alternativas: ["1985", "1989", "1991", "1995"], correta: 1 },
            { texto: "Qual foi a primeira capital do Brasil colonial?", alternativas: ["Rio de Janeiro", "São Paulo", "Salvador", "Recife"], correta: 2 }
        ]
    },
    geografia: {
        nome: "Geografia",
        perguntas: [
            { texto: "Qual é o maior país da América do Sul?", alternativas: ["Argentina", "Brasil", "Peru", "Colômbia"], correta: 1 },
            { texto: "Qual é o rio mais extenso do mundo?", alternativas: ["Nilo", "Amazonas", "Yangtzé", "Mississippi"], correta: 1 },
            { texto: "Qual é o deserto mais árido do mundo?", alternativas: ["Saara", "Atacama", "Gobi", "Kalahari"], correta: 1 },
            { texto: "Qual é a capital da Austrália?", alternativas: ["Sydney", "Melbourne", "Camberra", "Perth"], correta: 2 },
            { texto: "Quantos estados tem o Brasil?", alternativas: ["24", "25", "26", "27"], correta: 2 },
            { texto: "Qual é a montanha mais alta do mundo?", alternativas: ["K2", "Everest", "Kilimanjaro", "Aconcágua"], correta: 1 },
            { texto: "Qual é o menor país do mundo em área?", alternativas: ["Mônaco", "Vaticano", "San Marino", "Liechtenstein"], correta: 1 }
        ]
    }
};
