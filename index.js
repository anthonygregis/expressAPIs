const express = require('express');
const axios = require('axios');
const ejsLayouts = require('express-ejs-layouts');
const app = express();

app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.static('public'))

require('dotenv').config()

app.get('/', function(req, res) {
    let apiParams = {
        params: {
            s: 'star wars',
            apiKey: process.env.APIKEY
        }
    }

    axios.get('http://omdbapi.com/', apiParams)
        .then(response => {
            console.log(response.data)
            res.render('home', {data: response.data.Search})
        })
        .catch(err => {
            console.log(err)
        })
});

app.listen(8000, () => {
    console.log('listening on http://localhost:8000')
});