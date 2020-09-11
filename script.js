'use strict';

const select = document.querySelector('select');
const input = document.querySelector('input');
const btn = document.getElementById('search_request_btn');
const closeBtnA = document.querySelector('.close-btn_a');
const closeBtnB = document.querySelector('.close-btn_b');
const closeBtnC = document.querySelector('.close-btn_c');

btn.onclick = () => {
  const api = "https://swapi.dev/api/";

  let url = api + select.value + '/?search=';
  url += input.value;

  let request = new XMLHttpRequest();

  request.addEventListener("load", () => {
    const response = JSON.parse(request.response); 

    if (request.status !== 200) {
      alert(
        'Произошла ошибка при получении ответа от сервера:\n\n' +
          response.message
      );
      return;
    }

    if (response.count == 0) {
      alert("К сожалению, данные не получены по запросу: " + url);
      return;
    } else {
      for (let record in response.results) {
        let html = document.createElement('li');
        html.innerHTML = response.results[record]['name'];
        document.querySelector('.search_result').insertAdjacentElement('beforeend', html);
      }
    }
  });

  request.open("get", url);
  request.send();
  document.querySelector('ul').innerHTML = '';
}

document.querySelector('ul').onclick = function(ev) {
  const api = "https://swapi.dev/api/";

  let searchTypeCode = select.value;
  let url = api + searchTypeCode + '/?search=';
  url += ev.target.textContent;

  let request = new XMLHttpRequest();

  request.onload = () => {
    const response = JSON.parse(request.response);
    if (request.status !== 200) {
      alert(
        'Произошла ошибка при получении ответа от сервера:\n\n' +
          response.message
      );
      return;
    }

    if (response.count == 0) {
      alert("К сожалению, данные не получены по запросу: " + url);
      return;
    } else if (searchTypeCode == 'people') {
      document.querySelector('.person_data').classList.toggle('response-disabled');
      const record = response.results[0];
      document.getElementById('name').innerHTML = record.name;
      document.getElementById('height').innerHTML = record.height;
      document.getElementById('mass').innerHTML = record.mass;
      document.getElementById('birth_year').innerHTML = record.birth_year;
      document.getElementById('films_count').innerHTML = record.films.length;
    } else if (searchTypeCode == 'planets') {
      document.querySelector('.planet_data').classList.toggle('response-disabled');
      const record = response.results[0];
      document.getElementById('planet_name').innerHTML = record.name;
      document.getElementById('planet_climate').innerHTML = record.climate;
      document.getElementById('planet_terrain').innerHTML = record.terrain;
      document.getElementById('planet_population').innerHTML = record.population;
    } else if (searchTypeCode == 'starships') {
      document.querySelector('.ship_data').classList.toggle('response-disabled');
      const record = response.results[0];
      document.getElementById('ship_name').innerHTML = record.name;
      document.getElementById('ship_model').innerHTML = record.model;
      document.getElementById('ship_manufacturer').innerHTML = record.manufacturer;
      document.getElementById('ship_hyperdrive_rating').innerHTML = record.hyperdrive_rating;
  }
}

  request.open("get", url);
  request.send();

  closeBtnA.onclick = () => {
    closeBtnA.parentElement.classList.toggle('response-disabled');
  }

  closeBtnB.onclick = () => {
    closeBtnB.parentElement.classList.toggle('response-disabled');
  }

  closeBtnC.onclick = () => {
    closeBtnC.parentElement.classList.toggle('response-disabled');
  }

}