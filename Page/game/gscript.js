

let punti = 0;
let streak = 0;
const btn = document.getElementById("BOX");
let risposta = 0;
let limit = 19;
let errori = 0;
let assegno = 0;
let maxStreak = 0;
let maxAssegno = 0;
let tempotot = 15;
// Recupera il nome utente memorizzato nella sessionStorage
const nome = sessionStorage.getItem('username');

// Assicurati che il nome utente non sia vuoto
if (nome === null || nome.trim() === '') {
  alert('Username not found in session storage.');
} else {
  // Il nome utente è stato trovato nella sessionStorage e può essere utilizzato
  console.log('Username:', nome);
}

async function hideAll(){
  document.getElementById("all").style.visibility = "hidden";
}

async function showAll(){
  document.getElementById("all").style.visibility = "visible";
  document.getElementById("BOX1").style.visibility = "visible";
  document.getElementById("BOX2").style.visibility = "visible";
  document.getElementById("BOX3").style.visibility = "visible";
  document.getElementById("BOX4").style.visibility = "visible";
}

async function contoAllaRovescia() {
  await hideAll();
  let count = 3;

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
  let randomSign = Math.floor(Math.random() * 2);
  let tmp = "";

  document.getElementById("punteggio").innerHTML = "Points = " + punti;


  //risposta esatta con segno più
  let casellaGiusta = (Math.floor(Math.random() * 4) + 1);
  if (randomSign == 0) {
    sign = "+";
    risposta = first + second;
  }
  else {
    sign = "-";
    if (first < second) {
      tmp = first;
      first = second;
      second = tmp;
    }

    //risposta esatta con segno meno
    risposta = first - second;
  }

  document.getElementById("BOX" + casellaGiusta).innerHTML = risposta;


  //formulazione domanda
  document.getElementById("Question").innerHTML = first + " " + sign + " " + second + " = ?";

  if (casellaGiusta == 1) {
    let a = 0;
    let b = 0;
    let c = 0;
    do {
      a = document.getElementById("BOX2").innerHTML = Math.floor(Math.random() * limit);
      b = document.getElementById("BOX3").innerHTML = Math.floor(Math.random() * limit);
      c = document.getElementById("BOX4").innerHTML = Math.floor(Math.random() * limit);
    } while (a == b || b == c || c == a || risposta == a || risposta == b || risposta == c);

  }

  if (casellaGiusta == 2) {
    let a = 0;
    let b = 0;
    let c = 0;
    do {
      a = document.getElementById("BOX1").innerHTML = Math.floor(Math.random() * limit);
      b = document.getElementById("BOX3").innerHTML = Math.floor(Math.random() * limit);
      c = document.getElementById("BOX4").innerHTML = Math.floor(Math.random() * limit);
    } while (a == b || b == c || c == a || risposta == a || risposta == b || risposta == c);
  }

  if (casellaGiusta == 3) {
    let a = 0;
    let b = 0;
    let c = 0;
    do {
      a = document.getElementById("BOX1").innerHTML = Math.floor(Math.random() * limit);
      b = document.getElementById("BOX2").innerHTML = Math.floor(Math.random() * limit);
      c = document.getElementById("BOX4").innerHTML = Math.floor(Math.random() * limit);
    } while (a == b || b == c || c == a || risposta == a || risposta == b || risposta == c);
  }

  if (casellaGiusta == 4) {
    let a = 0;
    let b = 0;
    let c = 0;
    do {
      a = document.getElementById("BOX1").innerHTML = Math.floor(Math.random() * limit);
      b = document.getElementById("BOX2").innerHTML = Math.floor(Math.random() * limit);
      c = document.getElementById("BOX3").innerHTML = Math.floor(Math.random() * limit);
    } while (a == b || b == c || c == a || risposta == a || risposta == b || risposta == c);

  }



  if (streak > maxStreak) {
    maxStreak = streak;
  }

  if (assegno > maxAssegno) {
    maxAssegno = assegno;
  }



  if (streak >= 15 && streak < 25) {
    limit = 100;
  }

  if (streak >= 25 && streak < 35) {
    limit = 200;
  }

  if (streak >= 35) {
    limit = 500;
  }


  document.getElementById("streak").innerHTML = "Streak = " + streak;


}

function firstbtn() {
  if (document.getElementById("BOX1").innerHTML == risposta) {
    punti = punti + 100;
    streak++;
    time = time + 2;
    if (streak >= 5) {
      assegno = assegno + 50;
      punti = punti + assegno;
    }
    tempotot = tempotot + 2;
  }
  else {
    assegno = 0;
    errori++;
    streak = 0;
    time--;
    tempotot--;
  }
  casuale();
}

function secondbtn() {
  if (document.getElementById("BOX2").innerHTML == risposta) {
    punti = punti + 100;
    streak++;
    time = time + 2;
    if (streak >= 5) {
      assegno = assegno + 50;
      punti = punti + assegno;
    }
    tempotot = tempotot + 2;
  }
  else {
    assegno = 0;
    errori++;
    streak = 0;
    time--;
    tempotot--;
  }
  casuale();
}

function thirdbtn() {
  if (document.getElementById("BOX3").innerHTML == risposta) {
    punti = punti + 100;
    streak++;
    time = time + 2;
    if (streak >= 5) {
      assegno = assegno + 50;
      punti = punti + assegno;
    }
    tempotot = tempotot + 2;
  }
  else {
    assegno = 0;
    errori++;
    streak = 0;
    time--;
    tempotot--;
  }
  casuale();
}

function fourthbtn() {
  if (document.getElementById("BOX4").innerHTML == risposta) {
    punti = punti + 100;
    streak++;
    time = time + 2;
    if (streak >= 5) {
      assegno = assegno + 50;
      punti = punti + assegno;
    }
    tempotot = tempotot + 2;
  }
  else {
    assegno = 0;
    errori++;
    streak = 0;
    time--;
    tempotot--;
  }
  casuale();
}


let time = 18;
const timer = setInterval(() => {
  time--;
  if (time >= 1) {
    document.getElementById("timer").innerHTML = time;
  } else if(time == 0){
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

function hideResponses(){
  document.getElementById("resp").style.visibility = "hidden";
}


function visible() {
  maxAssegno = maxAssegno + 0;
  document.getElementById("userDisplay").innerHTML = "Good work " + nome + ",<br>Look at your stats!";
  document.getElementById("score").innerHTML = "Points = " + punti + "<br>Errors = " + errori + "<br>Time = " + tempotot + "s<br>Max Streak = " + maxStreak + "<br>Top Earning (with 1 choice) = " + maxAssegno;
  document.getElementById("score").style.visibility = "visible";
  document.getElementById("tasti").style.visibility = "visible";
  document.getElementById("torna").innerHTML = "You can look at the scoreboard or reach the home!";
  document.getElementById("BOX1").style.visibility = "hidden";
  document.getElementById("BOX2").style.visibility = "hidden";
  document.getElementById("BOX3").style.visibility = "hidden";
  document.getElementById("BOX4").style.visibility = "hidden";

  console.log("STOP = ");
  console.log(punti);

  // Ottieni la data corrente
  const currentDate = new Date();

  // Formatta la data come "dd/mm/yyyy"
  const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;

  // Formatta l'ora come "hh:mm"
  const formattedTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;

  // Componi la stringa finale
  const formattedDateTime = `${formattedDate} alle ${formattedTime}`;

  // Crea un oggetto con le statistiche della partita
  const stats = {
    name: nome,
    score: punti,
    maxStreak: maxStreak,
    time: tempotot,
    date: formattedDateTime
  };

  // Invia le statistiche al server
  fetch('/scrivitabella', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      elemento: stats
    })
  })
    .then(res => {
      console.log('Dati salvati con successo sul server');
    })
    .catch(error => {
      console.error('Errore durante il salvataggio dei dati sul server:', error);
    });
}

    // Chiamata alla funzione contoAllaRovescia() quando il documento è completamente caricato
    document.addEventListener("DOMContentLoaded", function() {
      contoAllaRovescia();
    });
