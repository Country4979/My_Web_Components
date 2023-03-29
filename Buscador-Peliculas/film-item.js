/*
film-item

atributos:
- imagen
- nombre
- nota

eventos:
- 0

funcionamiento: pintar la imagen de la película,
pintar la nota de la peli y cuando se clique,
abrir una pestaña nueva con el detalle en filmaffinity
*/

import "./progress-bar.js";

const templateElement = document.createElement("template");

templateElement.innerHTML = `
<style>

.film-item-wrapper {
  height: 300px;
  width: 200px;
  position: relative;
}

a {
  width: 100%;
  height: 100%;
  display: block;
}

img {
  width: 100%;
}

progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

</style>

<div class="film-item-wrapper">
  <a href="" target="_blank">
    <img src="" alt="">
    <progress-bar></progress-bar>
  </a>
</div>

`;

class FilmItem extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.image = this.getAttribute('image') || 'https://www.google.com/url?sa=i&url=https%3A%2F%2Festadisticas.sieca.int%2Fdocumentos%2Fdetalle%2F1200&psig=AOvVaw3Or6p4YvZPZrrXhg7bio3H&ust=1680034473592000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLjH8qH2_P0CFQAAAAAdAAAAABAE';
    this.name = this.getAttribute('name')
    this.rating = this.getAttribute('rating') || 0;
}

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    //Primero rellenamos el dato con todos los datos, así está ya modificado antes de pintarlo. Lo hacmos así por el progress bar
    
    //Metemos el src de la imagen
    template.querySelector('img').src = this.image;

    //Metemos el url con el nombre
    const detailUrl = `https://www.filmaffinity.com/es/search.php?stext=${this.name}`;
    const linkElement = template.querySelector('a');
    linkElement.setAttribute('href', `${detailUrl}`);
    
    const progressBarElement = template.querySelector('progress-bar');
    progressBarElement.setAttribute('value', this.rating);

    this.shadowRoot.appendChild(template);
  }
}

customElements.define("film-item", FilmItem);