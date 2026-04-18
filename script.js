let portfolio = JSON.parse(localStorage.getItem("portfolio")) || []
let chart
function addInvestment(){
let name = document.getElementById("stockName").value
let quantity = Number(document.getElementById("quantity").value)
let buyPrice = Number(document.getElementById("buyPrice").value)
let currentPrice = Number(document.getElementById("currentPrice").value)
if(name=="" || quantity<=0 || buyPrice<=0 || currentPrice<=0){
alert("Please fill all fields")
return
}
portfolio.push({
name,
quantity,
buyPrice,
currentPrice
})
localStorage.setItem("portfolio",JSON.stringify(portfolio))
// clear input fields after adding
document.getElementById("stockName").value=""
document.getElementById("quantity").value=""
document.getElementById("buyPrice").value=""
document.getElementById("currentPrice").value=""
displayPortfolio()
}
function deleteInvestment(index){
portfolio.splice(index,1)
localStorage.setItem("portfolio",JSON.stringify(portfolio))
displayPortfolio()
}
function displayPortfolio(){
let table = document.getElementById("portfolioTable")
table.innerHTML=""
let totalValue = 0
let labels=[]
let data=[]
portfolio.forEach((item,index)=>{
let investment = item.quantity * item.buyPrice
let currentValue = item.quantity * item.currentPrice
let profit = currentValue - investment
totalValue += currentValue
labels.push(item.name)
data.push(currentValue)
let color = profit >= 0 ? "green" : "red"
let row =
`<tr>
<td>${item.name}</td>
<td>₹${investment}</td>
<td>₹${currentValue}</td>
<td style="color:${color}">₹${profit}</td>
<td><button onclick="deleteInvestment(${index})">Delete</button></td>
</tr>`
table.innerHTML += row
})
document.getElementById("totalValue").innerText = totalValue
calculateRisk()
drawChart(labels,data)
}
function calculateRisk(){
if(portfolio.length==0){
document.getElementById("riskScore").innerText="Low Risk"
return
}
if(portfolio.length<3){
document.getElementById("riskScore").innerText="High Risk"
}
else if(portfolio.length<5){
document.getElementById("riskScore").innerText="Medium Risk"
}
else{
document.getElementById("riskScore").innerText="Low Risk"
}
}
function drawChart(labels,data){
let ctx=document.getElementById("portfolioChart")
if(chart){
chart.destroy()
}
chart=new Chart(ctx,{
type:'pie',
data:{
labels:labels,
datasets:[{
data:data
}]
},
options:{
responsive:true,
maintainAspectRatio:false
}
})
}
// dark mode toggle
document.getElementById("darkBtn").onclick=function(){
document.body.classList.toggle("dark")
}
// allow enter key to add investment
document.addEventListener("keypress",function(e){
if(e.key==="Enter"){
addInvestment()
}
})
displayPortfolio()
