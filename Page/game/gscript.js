let punti = 0;
let streak = 0;
let risposta = 0;
let limit = 19;
let errori = 0;
let assegno = 0;
let maxStreak = 0;
let maxAssegno = 0;
let tempotot = 15;
let time = 20;

// Recupera il nome utente memorizzato nella sessionStorage
const nome = sessionStorage.getItem('username');

// Assicurati che il nome utente non sia vuoto
if (nome === null || nome.trim() === '') {
  alert('Username not found in session storage.');
} else {
  console.log('Username:', nome);
}

async function hideAll() {
  document.getElementById("all").style.visibility = "hidden";
}

async function showAll() {
  document.getElementById("all").style.visibility = "visible";
  document.getElementById("BOX1").style.visibility = "visible";
  document.getElementById("BOX2").style.visibility = "visible";
  document.getElementById("BOX3").style.visibility = "visible";
  document.getElementById("BOX4").style.visibility = "visible";
}

async function contoAllaRovescia() {
  await hideAll();
  let count = 5;
  const countdownDisplay = document.getElementById('countdownDisplay'); // Paragrafo per visualizzare il conto alla rovescia

  const countdown = async () => {
    countdownDisplay.textContent = count; // Aggiorna il testo per visualizzare il conto alla rovescia
    count--;
    if (count >= 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await countdown();
    } else {
      document.getElementById("countdownDisplay").style.visibility = "hidden";
      console.log('Via!');
      tempotot = 15;
      await showAll();
      casuale();
    }
  };

  await countdown();
}

function casuale() {
  console.log("Streak = " + streak + "\nPunti = " + punti + "\nLimite = " + limit);

  let first = Math.floor(Math.random() * (limit / 2));
  let second = Math.floor(Math.random() * (limit / 2));
  let randomSign = Math.floor(Math.random() * 4);
  let sign = "";
  document.getElementById("punteggio").innerHTML = "Points = " + punti;

  switch (randomSign) {
    case 0:
      sign = "+";
      risposta = first + second;
      break;
    case 1:
      sign = "-";
      if (first < second) [first, second] = [second, first];
      risposta = first - second;
      break;
    case 2:
      sign = "x";
      risposta = first * second;
      break;
    case 3:
      sign = "÷";
      if (second === 0 || first % second !== 0) {
        sign = "+";
        risposta = first + second;
      } else {
        risposta = first / second;
      }
      break;
  }

  let casellaGiusta = Math.floor(Math.random() * 4) + 1;
  document.getElementById("BOX" + casellaGiusta).innerHTML = risposta.toString();
  document.getElementById("Question").innerHTML = `${first} ${sign} ${second} = ?`;

  let boxes = [1, 2, 3, 4].filter(n => n !== casellaGiusta);

  boxes.forEach(box => {
    let value;
    do {
      value = Math.floor(Math.random() * limit).toString();
    } while (value === document.getElementById("BOX" + casellaGiusta).innerHTML ||
    value === document.getElementById("BOX" + boxes[0]).innerHTML ||
    value === document.getElementById("BOX" + boxes[1]).innerHTML ||
      value === document.getElementById("BOX" + boxes[2]).innerHTML);
    document.getElementById("BOX" + box).innerHTML = value;
  });

  if (streak > maxStreak) maxStreak = streak;
  if (assegno > maxAssegno) maxAssegno = assegno;

  if (streak >= 20 && streak < 30) limit = 50;
  if (streak >= 30 && streak < 40) limit = 100;
  if (streak >= 40) limit = 200;

  document.getElementById("streak").innerHTML = "Streak = " + streak;
}

function checkAnswer(boxId) {
  let selectedAnswer = parseInt(document.getElementById(boxId).innerHTML, 10);
  if (selectedAnswer === risposta) {
    punti += 100;
    streak++;
    time += 1;
    if (streak >= 5) {
      assegno += 15;
      punti += assegno;
    }
    tempotot += 2;
  } else {
    assegno = 0;
    errori++;
    streak = 0;
    time = time - 2;
    tempotot--;
  }
  casuale();
}

const timer = setInterval(() => {
  time--;
  if (time >= 1) {
    document.getElementById("timer").innerHTML = time;
  } else if (time == 0) {
    hideResponses(); // Nasconde tutti gli elementi quando il tempo è scaduto
  }
  else {
    hideElements(); // Nasconde tutti gli elementi quando il tempo è scaduto
    clearInterval(timer);
  }
}, 1000);

function hideElements() {
  document.getElementById("all").style.visibility = "hidden";
  visible();
}

function hideResponses() {
  document.getElementById("resp").style.visibility = "hidden";
}

function visible() {
  maxAssegno = maxAssegno + 0;
  document.getElementById("userDisplay").innerHTML = `Good work ${nome},<br>Look at your stats!`;
  document.getElementById("score").innerHTML = `Points = ${punti}<br>Errors = ${errori}<br>Time = ${tempotot}s<br>Max Streak = ${maxStreak}<br>Top Earning (with 1 choice) = ${maxAssegno}`;
  document.getElementById("score").style.visibility = "visible";
  document.getElementById("tasti").style.visibility = "visible";
  document.getElementById("torna").innerHTML = "You can look at the scoreboard or reach the home!";
  document.getElementById("BOX1").style.visibility = "hidden";
  document.getElementById("BOX2").style.visibility = "hidden";
  document.getElementById("BOX3").style.visibility = "hidden";
  document.getElementById("BOX4").style.visibility = "hidden";

  console.log("STOP = ", punti);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
  const formattedTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;
  const formattedDateTime = `${formattedDate} alle ${formattedTime}`;

  const stats = {
    name: nome,
    score: punti,
    maxStreak: maxStreak,
    time: tempotot,
    date: formattedDateTime
  };

  fetch('/scrivitabella', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ elemento: stats })
  })
    .then(res => {
      console.log('Dati salvati con successo sul server');
    })
    .catch(error => {
      console.error('Errore durante il salvataggio dei dati sul server:', error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  contoAllaRovescia();
});
