const express = require('express');
const cors = require('cors');

const shows = require('./shows');

const app = express();
app.use(cors(function(res, next)
{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
}
));
/*
app.use(function(res, next)
{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/

app.get('/', (res) => {
  res.json({
    message: 'Welcome to KSDB !'
  });
});

//search URL like /search/showName
app.get('/search/:title', (req, res) => {
  shows
  .searchShows(req.params.title)
  .then(shows => {
    res.json(shows);
  });
});

app.get('/show/:imdbID', (req, res) => {
  shows
  .getShow(req.params.imdbID)
  .then(show => {
    res.json(show);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port: ' + port);
});