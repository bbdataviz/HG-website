const express = require('express');
const app = express();

const cors = require('cors');

app.use()

app.get('/', (req, res) => {
    res.status(200).json({ title: 'hello world'});
})