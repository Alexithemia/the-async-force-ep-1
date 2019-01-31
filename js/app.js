function createPerson4Request(url, id, propertyName) {
  let oReq = new XMLHttpRequest();
  oReq.addEventListener('load', function () {
    changeWhat(this.responseText, id, propertyName)
  });
  oReq.open('GET', url);
  oReq.send();
}

function createPerson14Request(url, id, propertyName) {
  let oReq = new XMLHttpRequest();
  oReq.addEventListener('load', function () {
    changeWhat(this.responseText, id, propertyName)
  });
  oReq.open('GET', url);
  oReq.send();
}

function changeWhat(text, id, propertyName) {
  let response = JSON.parse(text);
  document.querySelector(id.concat('Name')).innerHTML = response.name;
  switch (propertyName) {
    case 'HomeWorld':
      newReq(response.homeworld, id, propertyName);
      break;
    case 'Species':
      newReq(response.species[0], id, propertyName);
      break;
  }
}

function newReq(url, id, propertyName) {
  let worldReq = new XMLHttpRequest();
  worldReq.addEventListener('load', function () {
    setProperty(this.responseText, id, propertyName)
  });
  worldReq.open('GET', url);
  worldReq.send();
}

function setProperty(text, id, propertyName) {
  let speciesResponse = JSON.parse(text);
  document.querySelector(id + propertyName).innerHTML = speciesResponse.name;
}

function createFilmListRequest(url) {
  let filmReq = new XMLHttpRequest();
  filmReq.addEventListener('load', function () {
    setFilms(this.responseText);
  });
  filmReq.open('GET', url);
  filmReq.send();
}

function setFilms(text) {
  let filmsResponse = JSON.parse(text);
  for (let i = 0; i < filmsResponse.results.length; i++) {
    let li = document.createElement('li');
    li.className = 'film';
    let filmList = document.getElementById('filmList');
    filmList.appendChild(li);
    let h2 = document.createElement('h2');
    h2.className = 'filmTitle';
    h2.innerHTML = filmsResponse.results[i].title;
    li.appendChild(h2);
    let h3 = document.createElement('h3');
    h3.innerHTML = 'Planets';
    li.appendChild(h3);
    let ul = document.createElement('ul');
    ul.className = 'filmPlanets';
    li.appendChild(ul);
    for (let j = 0; j < filmsResponse.results[i].planets.length; j++) {
      createPlanetRequest(filmsResponse.results[i].planets[j], ul)
    }
  }
}

function createPlanetRequest(url, ul) {
  let planetReq = new XMLHttpRequest();
  planetReq.addEventListener('load', function () {
    setPlanets(this.responseText, ul)
  });
  planetReq.open('GET', url);
  planetReq.send();
}

function setPlanets(text, ul) {
  let planetResponse = JSON.parse(text);
  let liPlanet = document.createElement('li');
  liPlanet.className = 'filmPlanets';
  liPlanet.innerHTML = planetResponse.name;
  ul.appendChild(liPlanet);
}

createPerson4Request('https://swapi.co/api/people/4/', '#person4', 'HomeWorld');

createPerson14Request('https://swapi.co/api/people/14/', '#person14', 'Species');

createFilmListRequest('https://swapi.co/api/films/');