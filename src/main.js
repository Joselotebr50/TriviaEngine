
const app=document.getElementById('app')||document.body;
const perguntas=[{p:'Qual é a capital do Brasil?',a:['Rio','Brasília','SP','Salvador'],c:1}];
function render(){
 const q=perguntas[0];
 app.innerHTML=`<h1>Trivia Engine</h1><h2>${q.p}</h2>`+
 q.a.map((x,i)=>`<button onclick="window.resp(${i})">${x}</button>`).join('<br>');
}
window.resp=i=>{alert(i===perguntas[0].c?'Correto!':'Errado!');}
render();
