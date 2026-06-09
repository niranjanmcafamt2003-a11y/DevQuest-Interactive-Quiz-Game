// ============================
// DEVQUEST LEADERBOARD SYSTEM
// ============================


// GET SCORES FROM LOCALSTORAGE

let leaderboard = JSON.parse(localStorage.getItem("devquestLeaderboard")) || [];


// SORT SCORES (HIGHEST FIRST)

leaderboard.sort((a,b) => b.score - a.score);


// SHOW TOP 10

leaderboard = leaderboard.slice(0,10);


// TABLE ELEMENT

const table = document.getElementById("leaderboardTable");


// DISPLAY SCORES

leaderboard.forEach((player,index)=>{

let row = document.createElement("tr");

row.innerHTML = `
<td class="rank">${index+1}</td>
<td>${player.name}</td>
<td>${player.score}</td>
`;

table.appendChild(row);

});