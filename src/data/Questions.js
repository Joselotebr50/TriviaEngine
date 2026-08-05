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
    }
};
