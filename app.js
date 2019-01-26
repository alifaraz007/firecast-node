const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/cafe', require('./routers/cafe'));

//error handler
app.use((err, req, res, next) => {
    res.status(400).json({
        error: err.message
    });
});

const port = 3000;
app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`listening to port ${port}`);
})