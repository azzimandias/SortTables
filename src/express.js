const express = require('express');
const app = express();
const port = 3000;
app.set('view engine', 'html');
app.use(express.static(process.cwd()));
app.get(`/`, (request, response) => {
    response.sendFile(process.cwd() + '/public/index.html', err => {
        console.log('something bad happened', err);
    });
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(` server is listening on ${port}\n http://localhost:3000/`)
});
