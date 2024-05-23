const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Mialibreria = require('./myutil.js');
const fs = require('fs');

const app = express();
let data = require('./data/data.json');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'Page/presentation')));
app.use(express.static(path.join(__dirname, 'Page/home')));
app.use(express.static(path.join(__dirname, 'Page/game')));
app.use(express.static(path.join(__dirname, 'Page/game2')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/Page/presentation/presentation.html`));
});

app.get('/game', (req, res) => {
  res.sendFile(path.join(`${__dirname}/Page/game/game.html`));
});

app.get('/game2', (req, res) => {
  res.sendFile(path.join(`${__dirname}/Page/game2/game2.html`));
});


app.get('/home', (req, res) => {
  res.sendFile(path.join(`${__dirname}/Page/home/home.html`));
});

app.get('/table', (req, res) => {
  jsonData = Mialibreria.readFile('./data/data.json');
  res.render('table', { data: jsonData });

});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const users = JSON.parse(fs.readFileSync('./data/users.json'));
  const userData = JSON.parse(fs.readFileSync('./data/data.json'));

  const { username, password } = req.body;

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    // Trova il massimo punteggio dell'utente per il tipo "NORMAL"
    const normalMaxScore = userData.reduce((maxScore, userData) => {
      if (userData.name === username && userData.type === 'NORMAL' && userData.score > maxScore) {
        return userData.score;
      }
      return maxScore;
    }, 0);

    // Trova il massimo punteggio dell'utente per il tipo "HARDCORE"
    const hardcoreMaxScore = userData.reduce((maxScore, userData) => {
      if (userData.name === username && userData.type === 'HARDCORE' && userData.score > maxScore) {
        return userData.score;
      }
      return maxScore;
    }, 0);

    res.status(200).json({ user, normalMaxScore, hardcoreMaxScore });
  } else {
    res.status(401).json({ message: 'Credenziali non valide' });
  }
});


// Aggiungi questa route al tuo file server.js

app.post('/register', (req, res) => {
  const users = JSON.parse(fs.readFileSync('./data/users.json'));
  const { username, password } = req.body;

  // Verifica se l'utente esiste già
  const existingUser = users.find(user => user.username === username);

  if (existingUser) {
    res.status(400).json({ message: 'L\'utente esiste già' });
  } else if (!username || !password || username == " " || username == "") {
    return res.status(400).json({ message: 'Username o password mancanti' });
  } else {
    // Crea un nuovo utente
    const newUser = { username, password };
    users.push(newUser);

    // Scrivi i nuovi utenti nel file users.json
    fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2));

    res.status(201).json({ message: 'Utente creato' });
  }
});


app.use(express.json());

app.post('/scrivitabella', (req, res) => {
  let elemento = req.body.elemento;
  let jsonData = Mialibreria.readFile('./data/data.json');

  // Cerca un elemento con lo stesso nome e tipo nel file JSON
  const existingElementIndex = jsonData.findIndex(item => item.name === elemento.name && item.type === elemento.type);

  if (existingElementIndex !== -1) {
    // Se esiste un elemento con lo stesso nome e tipo
    if (elemento.score > jsonData[existingElementIndex].score) {
      // Se lo score appena ottenuto è maggiore, sostituisci l'elemento nel file JSON
      jsonData[existingElementIndex] = elemento;
      Mialibreria.writeFileJSON('./data/data.json', jsonData);
      console.log("Score aggiornato per", elemento.name);
    } else {
      console.log("Lo score non è sufficientemente alto per", elemento.name);
    }
  } else {
    // Se l'utente non è presente nel file JSON, aggiungi semplicemente l'elemento
    jsonData.push(elemento);
    Mialibreria.writeFileJSON('./data/data.json', jsonData);
    console.log("Nuovo elemento aggiunto:", elemento.name);
  }

  res.sendStatus(200); // Invia una risposta di successo al client
});



app.listen(5000, () => {
  console.log("Listening on port 5000");
});
