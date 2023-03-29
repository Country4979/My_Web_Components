/*
progress-bar

atributos:
- value

custom properties:
- color de la barra
- altura

eventos: 
- 0

funcionamiento: mostrar
el progreso en base a un valor
*/

const templateElement = document.createElement("template");

templateElement.innerHTML = `
<style>

.progress-bar-wrapper {
  width: 100%;
  height: var(--progress-bar-height, 30px);
  background-color: var(--progress-bar-background-color, black);
}

.progress-bar {
  height: 100%;
  background-color: var(--progress-bar-foreground-color, orange);
}

</style>

<div class="progress-bar-wrapper">
  <div class="progress-bar"></div>
</div>

`;

class ProgressBar extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.value = this.getAttribute('value') || 0 // numero entre 0 y 100
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    this.shadowRoot.appendChild(template);

    // tenemos que hacer que el div sea tan ancho según el value que tengamos.
    const progressBarElement = this.shadowRoot.querySelector('.progress-bar');
    progressBarElement.style.width = `${this.value}%`;
  }
}

customElements.define("progress-bar", ProgressBar);