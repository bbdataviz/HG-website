const express = require('express');
const app = express();
const cors = require('cors'); 

app.use(cors({
    origin: "https://github.com/bbdataviz/HG-website/"
}));
