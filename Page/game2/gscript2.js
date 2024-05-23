let punti = 0;
let streak = 0;
let risposta = "";
let limit = 19;
let errori = 0;
let assegno = 0;
let maxStreak = 0;
let maxAssegno = 0;
let tempotot = 60;
let time = 65;
console.log('HARDCORE');

// Recupera il nome utente memorizzato nella sessionStorage
const nome = sessionStorage.getItem('username');

// Assicurati che il nome utente non sia vuoto
if (nome === null || nome.trim() === '') {
  alert('Nome utente non trovato nella session storage.');
} else {
  console.log('Nome utente:', nome);
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
      await showAll();
      casuale();
    }
  };

  await countdown();
}

function casuale() {
  console.log('HARDCORE');
  console.log("Streak = " + streak + "\nPunti = " + punti + "\nLimite = " + limit);

  let questionType = Math.floor(Math.random() * 2);

  switch (questionType) {
    case 0:
      generateIntegral();
      break;
    case 1:
      generateDerivative();
      break;
  }

  document.getElementById("punteggio").innerHTML = "Punti = " + punti;

  if (streak > maxStreak) maxStreak = streak;
  if (assegno > maxAssegno) maxAssegno = assegno;

  if (streak >= 20 && streak < 30) limit = 50;
  if (streak >= 30 && streak < 40) limit = 100;
  if (streak >= 40) limit = 200;

  document.getElementById("streak").innerHTML = "Streak = " + streak;
}

function generateIntegral() {
  let coeff = Math.floor(Math.random() * 10) + 1;
  let power = Math.floor(Math.random() * 5) + 1;
  let integralTerm = `${coeff}x^${power}`;
  risposta = `${coeff}/${power + 1}x^${power + 1} + C`;

  let casellaGiusta = Math.floor(Math.random() * 4) + 1;
  document.getElementById("BOX" + casellaGiusta).innerHTML = risposta;
  document.getElementById("Question").innerHTML = `∫${integralTerm} dx = ?`;

  fillOtherBoxes(casellaGiusta, coeff, power, 'integral');
}

function generateDerivative() {
  let coeff = Math.floor(Math.random() * 10) + 1;
  let power = Math.floor(Math.random() * 5) + 1;
  let derivativeTerm = `${coeff}x^${power}`;
  risposta = power === 1 ? `${coeff}` : `${coeff * power}x^${power - 1}`;

  let casellaGiusta = Math.floor(Math.random() * 4) + 1;
  document.getElementById("BOX" + casellaGiusta).innerHTML = risposta;
  document.getElementById("Question").innerHTML = `Deriva la funzione ${derivativeTerm}`;

  fillOtherBoxes(casellaGiusta, coeff, power, 'derivative');
}

function fillOtherBoxes(casellaGiusta, coeff, power, type) {
  let boxes = [1, 2, 3, 4].filter(n => n !== casellaGiusta);

  boxes.forEach(box => {
    let fakeCoeff, fakePower, value;
    do {
      fakeCoeff = Math.random() < 0.5 ? coeff : Math.floor(Math.random() * 10) + 1;
      fakePower = Math.random() < 0.5 ? power : Math.floor(Math.random() * 5) + 1;
      if (type === 'integral') {
        value = `${fakeCoeff}/${fakePower + 1}x^${fakePower + 1} + C`;
      } else {
        value = fakePower === 1 ? `${fakeCoeff}` : `${fakeCoeff * fakePower}x^${fakePower - 1}`;
      }
    } while (value === document.getElementById("BOX" + casellaGiusta).innerHTML ||
      value === document.getElementById("BOX" + boxes[0]).innerHTML ||
      value === document.getElementById("BOX" + boxes[1]).innerHTML ||
      value === document.getElementById("BOX" + boxes[2]).innerHTML);
    document.getElementById("BOX" + box).innerHTML = value;
  });
}

function checkAnswer(boxId) {
  let selectedAnswer = document.getElementById(boxId).innerHTML;
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
  } else {
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
  document.getElementById("userDisplay").innerHTML = `Ben fatto ${nome},<br>Guarda le tue statistiche!`;
  document.getElementById("score").innerHTML = `Punti = ${punti}<br>Errori = ${errori}<br>Tempo = ${tempotot}s<br>Streak massimo = ${maxStreak}<br>Guadagno massimo (con una scelta) = ${maxAssegno}`;
  document.getElementById("score").style.visibility = "visible";
  document.getElementById("tasti").style.visibility = "visible";
  document.getElementById("torna").innerHTML = "Puoi guardare la classifica o tornare alla home!";
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
    date: formattedDateTime,
    type: 'HARDCORE'
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
