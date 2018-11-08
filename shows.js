const fetch = require('node-fetch');
const cheerio = require('cheerio');

const searchUrl = 'https://www.imdb.com/find?s=tt&ttype=ep&q=';
const showUrl = 'https://www.imdb.com/title/';

const showCache = {};
const searchCache = {};

function searchShows(searchTerm)
{
  if(searchCache[searchTerm])
  {
    console.log('Serving from cache: ', searchTerm);
    return Promise.resolve(searchCache[searchTerm]);
  }
  return fetch(`${searchUrl}${searchTerm}`)
    .then(response => response.text())
    .then(body =>
    {
      const shows = [];
      const $ = cheerio.load(body);
      $('.findResult').each(function(i, element)
      {
        const $element = $(element);
        const $image = $element.find('td a img');
        const $title = $element.find('td.result_text a');

        const imdbID = $title.attr('href').match(/title\/(.*)\//)[1];

        const show =
        {
          ID: imdbID,
          title: $title.text(),
          image: $image.attr('src')
        }
        shows.push(show);
      });

      searchCache[searchTerm] = shows;
      return shows;
    });
}

function getShow(imdbID)
{
  if(showCache[imdbID])
  {
    console.log('Serving from cache: ', imdbID);
    return Promise.resolve(showCache[imdbID]);
  }

  return fetch(`${showUrl}${imdbID}`)
    .then(response => response.text())
    .then(body =>
    {
      const $ = cheerio.load(body);
      const $title = $('.title_wrapper h1');
      const title = $title.first().contents().filter(function()
      {
        return this.type === 'text';
      }).text().trim();
      const rating = $('div.ratingValue strong').attr('title');
      const duration = $('div.title_wrapper div.subtext time').text().trim();
      let EpDuration = '~' + duration;

      const show = 
      {
        imdbID,
        title,
        rating,
        EpDuration
      };

      showCache[imdbID] = show;

      return show;
    });
}

module.exports = {
  searchShows,
  getShow
};