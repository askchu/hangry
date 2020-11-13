const fs = require('fs');

const book = {
    title: 'Fire',
    author: 'Alex'
}

const bookJSON = JSON.stringify(book);
console.log(bookJSON);

const parseData = JSON.parse(bookJSON);
console.log(parseData.author);

const dataBuffer = fs.readFileSync('data.json');
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);
console.log(data.location_suggestions[0].title);