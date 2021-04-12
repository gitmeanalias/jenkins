const express = require('express');
const app = express();

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send("<div style="height: '100vh';background: 'black';"><h1 style="color: orange">Welcome guys, I say hello!! from Jenkins</h1></div>")
});

app.get('/name/:myname', (req, res) => {
    const myName = req.params.myname
    res.send(`<h1>You entered:  ${myName}</h1>`)
})


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
