/* Film-item
Atributos: 0

Eventos: 0

Funcionamiento: 
    -Escuchar lo que el usuario quiere buscar.
    -Buscar en el API
    -Pintar películas
    -Borrar películas con una nueva búsqueda.
*/

import './input-field.js'
import './film-item.js'

const templateElement = document.createElement("template");

templateElement.innerHTML = `
<style>

.films-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

</style>

<div class="films-manager-wrapper">
  <div>
    <h1>Buscador de películas</div>
    <input-field></input-field>
    <film-item>
</div>

`;

class FilmManager extends HTMLElement {

    //Esto son cosas de la API Rest
    OMDB_API_KEY = "e477ed6a";
    API_URL = `http://www.omdbapi.com/?apikey=${this.OMDB_API_KEY}`;
  
    constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    this.shadowRoot.appendChild(template);

    const inputFieldElement = this.shadowRoot.querySelector('input-field');
    inputFieldElement.addEventListener('submit', (event) => {
        this.searchFilms(event.detail)
    })
  }

  async searchFilms(filename) {
    const response = await fetch(`${this.API_URL}&s=${filmName}`);
    const data = await response.json();
    const films = data.Search;
    //iteramos cada resultado para que vuelva a pedirnos la url donde obtener la nota
    
    films.forEach(async (film) => {
        const response = await fetch(`${this.API_URL}&i=${film.imdbID}`);
        const data = await response.json();
  
        const newFilm = {
          name: data.Title,
          image: data.Poster,
          rating: parseInt(data.imdbRating) * 10,
        }
  
        this.drawFilm(newFilm)
  
      });
    }

    drawFilm(film) {
        const divElement = document.createElement('div');
        divElement.innerHTML = `
          <film-item image="${film.image}" name="${film.name}" rating="${film.rating}"></film-item>
        `;
    
        this.shadowRoot.querySelector('.films-list').appendChild(divElement)
      }
    }
    
    customElements.define("films-manager", FilmManager);
    