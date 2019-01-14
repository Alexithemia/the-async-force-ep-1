function createPerson4Request(url, id, propertyName) {
  let oReq = new XMLHttpRequest();
  oReq.addEventListener('load', changeWhat);
  oReq.open('GET', url);
  oReq.send();

  function changeWhat() {
    let response = JSON.parse(this.responseText);
    document.querySelector(id.concat(propertyName)).innerHTML = response.name;
    changeWorld(response.homeworld);
  }
}

function createPerson14Request(url, id, propertyName) {
  let oReq = new XMLHttpRequest();
  oReq.addEventListener('load', changeWhat);
  oReq.open('GET', url);
  oReq.send();

  function changeWhat() {
    let response = JSON.parse(this.responseText);
    document.querySelector(id.concat(propertyName)).innerHTML = response.name;
    changeSpecies(response.species[0]);
  }
}

function changeWorld(worldUrl) {
  let worldReq = new XMLHttpRequest();
  worldReq.addEventListener('load', setWorld);
  worldReq.open('GET', worldUrl);
  worldReq.send();

  function setWorld() {
    let worldResponse = JSON.parse(this.responseText);
    console.log(worldResponse);
    document.querySelector('#person4HomeWorld').innerHTML = worldResponse.name;
  }
}

function changeSpecies(url) {
  let speciesReq = new XMLHttpRequest();
  speciesReq.addEventListener('load', setSpecies);
  speciesReq.open('GET', url);
  speciesReq.send();

  function setSpecies() {
    let speciesResponse = JSON.parse(this.responseText);
    document.querySelector('#person14Species').innerHTML = speciesResponse.name;
  }
}

function createFilmListRequest(url) {
  let filmReq = new XMLHttpRequest();
  filmReq.addEventListener('load', setFilms);
  filmReq.open('GET', url);
  filmReq.send();

  function setFilms() {
    let filmsResponse = JSON.parse(this.responseText);
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
        createPlanetRequest(filmsResponse.results[i].planets[j])
      }
      function createPlanetRequest(url) {
        let planetReq = new XMLHttpRequest();
        planetReq.addEventListener('load', setPlanets);
        planetReq.open('GET', url);
        planetReq.send();
      }
      function setPlanets() {
        let planetResponse = JSON.parse(this.responseText);
        let liPlanet = document.createElement('li');
        liPlanet.className = 'filmPlanets';
        liPlanet.innerHTML = planetResponse.name;
        ul.appendChild(liPlanet);
      }
    }

  }
}

createPerson4Request('https://swapi.co/api/people/4/', '#person4', 'Name');

createPerson14Request('https://swapi.co/api/people/14/', '#person14', 'Name');

createFilmListRequest('https://swapi.co/api/films/');