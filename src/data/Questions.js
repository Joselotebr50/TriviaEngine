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
            { texto: "Qual é o maior país do mundo em área?", alternativas: ["China", "Canadá", "Rússia", "Estados Unidos"], correta: 2 },
            { texto: "Quantas letras tem o alfabeto português?", alternativas: ["24", "25", "26", "27"], correta: 2 },
            { texto: "Qual é a moeda oficial do Japão?", alternativas: ["Won", "Yuan", "Iene", "Dólar"], correta: 2 },
            { texto: "Qual é o maior mamífero do mundo?", alternativas: ["Elefante-africano", "Baleia-azul", "Girafa", "Tubarão-baleia"], correta: 1 },
            { texto: "Quantos dias tem um ano bissexto?", alternativas: ["364", "365", "366", "367"], correta: 2 },
            { texto: "Qual é o idioma mais falado como língua nativa no mundo?", alternativas: ["Inglês", "Espanhol", "Mandarim", "Hindi"], correta: 2 },
            { texto: "Qual órgão do corpo humano é responsável por bombear o sangue?", alternativas: ["Pulmão", "Fígado", "Coração", "Rim"], correta: 2 },
            { texto: "Qual é o metal líquido à temperatura ambiente?", alternativas: ["Ferro", "Mercúrio", "Chumbo", "Alumínio"], correta: 1 },
            { texto: "Quantos lados tem um hexágono?", alternativas: ["5", "6", "7", "8"], correta: 1 },
            { texto: "Qual é a maior ilha do mundo?", alternativas: ["Madagascar", "Groenlândia", "Nova Guiné", "Bornéu"], correta: 1 },
            { texto: "Em que ano começou a pandemia de Covid-19 ser declarada globalmente?", alternativas: ["2018", "2019", "2020", "2021"], correta: 2 }
        ]
    },
    ciencia: {
        nome: "Ciência",
        perguntas: [
            { texto: "Qual é o símbolo químico do ouro?", alternativas: ["Ag", "Au", "Or", "Go"], correta: 1 },
            { texto: "Qual planeta é conhecido como Planeta Vermelho?", alternativas: ["Vênus", "Júpiter", "Marte", "Saturno"], correta: 2 },
            { texto: "Quantos ossos tem o corpo humano adulto?", alternativas: ["186", "206", "226", "246"], correta: 1 },
            { texto: "Qual é a velocidade da luz (aprox.)?", alternativas: ["300.000 km/s", "150.000 km/s", "3.000 km/s", "30.000 km/s"], correta: 0 },
            { texto: "Quem propôs a teoria da relatividade?", alternativas: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Galileu Galilei"], correta: 1 },
            { texto: "Qual é a fórmula química da água?", alternativas: ["CO2", "H2O", "O2", "NaCl"], correta: 1 },
            { texto: "Qual é o gás mais abundante na atmosfera terrestre?", alternativas: ["Oxigênio", "Gás carbônico", "Nitrogênio", "Hidrogênio"], correta: 2 },
            { texto: "Quantos planetas existem no Sistema Solar (atualmente)?", alternativas: ["7", "8", "9", "10"], correta: 1 },
            { texto: "Qual cientista formulou as leis do movimento e da gravitação?", alternativas: ["Einstein", "Newton", "Darwin", "Kepler"], correta: 1 },
            { texto: "Qual é a unidade básica da vida?", alternativas: ["Átomo", "Célula", "Molécula", "Tecido"], correta: 1 },
            { texto: "Qual vitamina é produzida pelo corpo através da exposição solar?", alternativas: ["Vitamina A", "Vitamina B12", "Vitamina C", "Vitamina D"], correta: 3 },
            { texto: "Qual é o processo pelo qual as plantas produzem energia a partir da luz?", alternativas: ["Respiração", "Fotossíntese", "Fermentação", "Osmose"], correta: 1 },
            { texto: "Quantos pares de cromossomos tem uma célula humana normal?", alternativas: ["21", "23", "25", "46"], correta: 1 },
            { texto: "Qual é o maior órgão do corpo humano?", alternativas: ["Fígado", "Cérebro", "Pele", "Intestino"], correta: 2 }
        ]
    },
    esportes: {
        nome: "Esportes",
        perguntas: [
            { texto: "Quantos jogadores tem um time de futebol em campo?", alternativas: ["9", "10", "11", "12"], correta: 2 },
            { texto: "Em que esporte se usa o termo 'ace'?", alternativas: ["Vôlei", "Tênis", "Basquete", "Handebol"], correta: 1 },
            { texto: "De quantos em quantos anos ocorrem as Olimpíadas?", alternativas: ["2", "3", "4", "5"], correta: 2 },
            { texto: "Quantas vezes o Brasil foi campeão da Copa do Mundo de futebol (até 2022)?", alternativas: ["3", "4", "5", "6"], correta: 2 },
            { texto: "Em que país nasceu o futebol moderno?", alternativas: ["Brasil", "Inglaterra", "Itália", "Alemanha"], correta: 1 },
            { texto: "Quantos sets são necessários para vencer uma partida de vôlei (melhor de 5)?", alternativas: ["2", "3", "4", "5"], correta: 1 },
            { texto: "Qual é a distância de uma maratona olímpica?", alternativas: ["21 km", "32 km", "42,195 km", "50 km"], correta: 2 },
            { texto: "Em qual esporte se disputa a 'Copa América'?", alternativas: ["Basquete", "Vôlei", "Futebol", "Tênis"], correta: 2 },
            { texto: "Quantos pontos vale uma cesta de 3 no basquete?", alternativas: ["1", "2", "3", "4"], correta: 2 },
            { texto: "Qual país sedia mais vezes os Jogos Olímpicos de Verão?", alternativas: ["EUA", "Grécia", "França", "Reino Unido"], correta: 0 },
            { texto: "Em que esporte é usada a expressão 'checkmate' (xeque-mate)?", alternativas: ["Damas", "Xadrez", "Dominó", "Pôquer"], correta: 1 },
            { texto: "Quantos jogadores tem uma equipe de vôlei em quadra?", alternativas: ["5", "6", "7", "8"], correta: 1 }
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
            { texto: "Qual é o sobrenome da família na série 'Succession'?", alternativas: ["Kennedy", "Roy", "Sterling", "Byrde"], correta: 1 },
            { texto: "Qual ator interpreta o Homem de Ferro no Universo Cinematográfico Marvel?", alternativas: ["Chris Evans", "Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo"], correta: 1 },
            { texto: "Qual desses filmes é dirigido por Christopher Nolan?", alternativas: ["Interestelar", "Gravidade", "Marte", "Perdido em Marte"], correta: 0 },
            { texto: "Em que cidade fictícia vive o super-herói Batman?", alternativas: ["Metropolis", "Gotham City", "Star City", "Central City"], correta: 1 },
            { texto: "Qual série retrata a fabricação de metanfetamina por um professor de química?", alternativas: ["Ozark", "Breaking Bad", "Narcos", "Better Call Saul"], correta: 1 },
            { texto: "Quem dirigiu 'Titanic' (1997)?", alternativas: ["James Cameron", "Steven Spielberg", "Ron Howard", "Michael Bay"], correta: 0 },
            { texto: "Qual desenho animado tem um personagem chamado 'Bob Esponja'?", alternativas: ["Nickelodeon", "Cartoon Network", "Disney", "Warner Bros"], correta: 0 },
            { texto: "Qual filme brasileiro venceu o Oscar de Melhor Filme Internacional em 2025?", alternativas: ["Cidade de Deus", "Ainda Estou Aqui", "Bacurau", "Tropa de Elite"], correta: 1 }
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
            { texto: "Qual desses é um festival de música brasileiro famoso?", alternativas: ["Coachella", "Rock in Rio", "Glastonbury", "Tomorrowland"], correta: 1 },
            { texto: "Qual cantora é conhecida como 'Rainha do Pop'?", alternativas: ["Britney Spears", "Madonna", "Beyoncé", "Lady Gaga"], correta: 1 },
            { texto: "Qual banda gravou a música 'Bohemian Rhapsody'?", alternativas: ["The Beatles", "Queen", "Led Zeppelin", "The Who"], correta: 1 },
            { texto: "Qual é o instrumento típico do forró nordestino, além da sanfona?", alternativas: ["Violino", "Triângulo", "Cavaquinho", "Flauta"], correta: 1 },
            { texto: "Quem é considerado o 'Rei do Rock'?", alternativas: ["Elvis Presley", "Chuck Berry", "Jimi Hendrix", "Little Richard"], correta: 0 },
            { texto: "Qual gênero musical jamaicano ficou mundialmente famoso com Bob Marley?", alternativas: ["Ska", "Reggae", "Dancehall", "Calypso"], correta: 1 }
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
            { texto: "Qual foi a primeira capital do Brasil colonial?", alternativas: ["Rio de Janeiro", "São Paulo", "Salvador", "Recife"], correta: 2 },
            { texto: "Em que ano foi proclamada a República no Brasil?", alternativas: ["1822", "1889", "1891", "1900"], correta: 1 },
            { texto: "Quem foi o navegador responsável pela chegada dos portugueses ao Brasil em 1500?", alternativas: ["Vasco da Gama", "Pedro Álvares Cabral", "Fernão de Magalhães", "Cristóvão Colombo"], correta: 1 },
            { texto: "Qual movimento revolucionário ocorreu na França em 1789?", alternativas: ["Revolução Industrial", "Revolução Francesa", "Revolução Russa", "Revolução Gloriosa"], correta: 1 },
            { texto: "Quem foi o líder nazista responsável pela Alemanha durante a Segunda Guerra?", alternativas: ["Joseph Stalin", "Benito Mussolini", "Adolf Hitler", "Winston Churchill"], correta: 2 },
            { texto: "Em que século ocorreu a chegada dos portugueses ao Brasil?", alternativas: ["XIV", "XV", "XVI", "XVII"], correta: 2 },
            { texto: "Qual foi o nome do período de ditadura militar no Brasil (1964-1985)?", alternativas: ["Estado Novo", "Regime Militar", "Era Vargas", "Primeira República"], correta: 1 },
            { texto: "Quem foi a rainha do Egito conhecida por sua relação com Júlio César e Marco Antônio?", alternativas: ["Nefertiti", "Cleópatra", "Hatshepsut", "Ísis"], correta: 1 }
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
            { texto: "Qual é o menor país do mundo em área?", alternativas: ["Mônaco", "Vaticano", "San Marino", "Liechtenstein"], correta: 1 },
            { texto: "Qual é a capital da França?", alternativas: ["Marselha", "Lyon", "Paris", "Nice"], correta: 2 },
            { texto: "Qual continente é conhecido como 'berço da humanidade'?", alternativas: ["Ásia", "América", "África", "Europa"], correta: 2 },
            { texto: "Qual é o país mais populoso do mundo (atualmente)?", alternativas: ["China", "Índia", "Estados Unidos", "Indonésia"], correta: 1 },
            { texto: "Qual oceano fica entre a América e a Europa/África?", alternativas: ["Pacífico", "Índico", "Atlântico", "Ártico"], correta: 2 },
            { texto: "Qual é a capital do Japão?", alternativas: ["Osaka", "Kyoto", "Tóquio", "Yokohama"], correta: 2 },
            { texto: "Quantos países fazem fronteira com o Brasil?", alternativas: ["8", "9", "10", "11"], correta: 2 },
            { texto: "Qual é o maior deserto de areia quente do mundo?", alternativas: ["Atacama", "Saara", "Gobi", "Namibe"], correta: 1 },
            { texto: "Qual país tem a maior extensão territorial da América Central?", alternativas: ["Guatemala", "Nicarágua", "Honduras", "Panamá"], correta: 1 }
        ]
    }
};
