const form = document.querySelector('form');
const searchInput = document.querySelector('input');
const resultsList = document.querySelector('#results');

const BASE_URL = 'https://ksdb-dev-fpizjylgyf.now.sh/'

form.addEventListener('submit', formSubmitted);

function formSubmitted(event)
{
  event.preventDefault();

  const searchTerm = searchInput.value;
  getSearchResults(searchTerm)
    .then(showResults);
}

function getSearchResults(searchTerm)
{
  return fetch(
    `${BASE_URL}search/${searchTerm}`
    )
    .then(res => res.json());
}



function showResults(results)
{
  console.log(results);
  results.forEach(movie => {})
  results.forEach(show => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    const a = document.createElement('a');

    li.appendChild(img);
    img.src = show.image;
    a.textContent = show.title;
    a.href = '/show.html?imdbID=' + show.imdbID;
    li.appendChild(a);
    resultsList.appendChild(li);
  });
}

