const express = require('express');
const app = express();
const port = 3000;
app.set('view engine', 'html');
app.use(express.static(__dirname.split('src')[0]));

app.get(`/`, (request, response) => {
    response.sendFile(__dirname.split('src')[0] + 'public/index.html', err => {
        console.log('something bad happened', err);
    });
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(` server is listening on ${port}\n http://localhost:3000/`)
});
