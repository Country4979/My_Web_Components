/* Progress bar
Atributos:
    -value

Custom Properities:
    -color de la barra

Eventos: 0

Funcionamiento: mostrar el progreso en base a un valor.
*/

const templateElement = document.createElement("template");

templateElement.innerHTML = `
<style>
.progress-bar-wrapper {
    width: 100%;
    height: var(--progress-bar--height, 30px)
    background-color: var(--progress-bar-background-color, black;)
}

.progress-bar {
    height: 30px;
    background-color: var(--progress-bar-foreground-color, black;)
}
</style>

<div class="progress-bar-wrapper">
  <div class="progress-bar></div>
</div>

`;

class ProgressBar extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    this.shadowRoot.appendChild(template);
  }
}

customElements.define("progress-bar", ProgressBar);