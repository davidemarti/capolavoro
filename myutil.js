const fs = require('fs');

function addElementToJSON(jsonData, element) {
  jsonData.push(element);
}

function writeFileJSON(file, dataJSON) {
  fs.writeFile(file, JSON.stringify(dataJSON), (err) => {
    if (err) {
      console.error('Errore durante la scrittura del file JSON:', err);
    } else {
      console.log('I dati sono stati scritti nel file data.json');
    }
  });
}

function readFile(percorsoFile) {
  try {
    const data = fs.readFileSync(percorsoFile, 'utf8');
    console.log('Lettura del file JSON completata');
    return JSON.parse(data);
  } catch (error) {
    console.error('Errore durante la lettura del file JSON:', error);
    return [];
  }
}

module.exports = { addElementToJSON, writeFileJSON, readFile };
