/* input-field

atributos:
    - buttonLabel
    - placeholder
    
eventos:
    - submit (value del input)

    funcionamiento: Cuando el usuario hace click, recoge el valor del input y lo lanza
    */

const templateElement = document.createElement("template");

templateElement.innerHTML = `
<style>
.input-field-wrapper {
    display: flex;
}

input {
    flex-grow: 1
}

</style>

<div class="keepcoding-component-wrapper">
  <input type="text" placeholder="">
  <button></button>
</div>

`;

class InputField extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    
    //Lectura de los atributos que vamos atener
    this.buttonLabel = this.getAttribute('buttonLabel') || 'Añadir';
    this.placeholder = this.getAttribute('placeholder') || 'Escribe algo para añadirlo';
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    this.shadowRoot.appendChild(template);
    
    const submitButton = this.shadowRoot.querySelector('button')
    const inputElement = this.shadowRoot.querySelector('input')

    submitButton.textContent = this.buttonLabel; //Pintamos el botón
    inputElement.placeholder = this.placeholder;  //Pintamos el placholder del input
    
    submitButton.addEventListener('click', () => {
        const inputValue = inputElement.value;  //Recopilamos el dato

        const event = new CustomEvent('submit', {
            detail: inputValue
        })
        this.dispatchEvent(event); //Disparamos el evento

        inputElement.value = "";
        })
    }
}

window.customElements.define("input-field", InputField);
