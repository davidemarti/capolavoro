
function Start() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => {

            if (response.ok) {
                // Memorizza il nome utente nella sessionStorage
                sessionStorage.setItem('username', username);

                // Reindirizza l'utente alla pagina del gioco
                window.location.href = '/game';
            } else {
                alert("Errore! Non hai effettuato l'accesso!");
            }
            throw new Error('Credenziali non valide');
        })
}

function accedi() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Credenziali non valide');
        })
        .then(data => {
            document.getElementById("username").value = data.user.username;
            userDisplay.innerHTML = "Benvenuto " + data.user.username + ",<br>Il tuo massimo storico è " + data.maxScore + " pts.";
            console.log('Accesso eseguito');
        })
        .catch(error => {
            console.error('Errore durante il login:', error.message);
            alert('Utente non trovato');
            location.reload();
        });
}

$(document).ready(function(){
    // Attiva il popover quando si fa clic sul pulsante INFO
    $('#infoPopover').popover();
});

function registrati() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => {
            if (response.ok) {
                alert('Utente creato');
            } else {
                throw new Error('Errore durante la registrazione', error.message);
            }
        })
        .catch(error => {
            console.error('Errore durante la registrazione:', error.message);
            // Gestisci qui l'errore (ad esempio, mostra un messaggio all'utente)
        });
}


