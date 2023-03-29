/* list-item

atributos:
    - value
    - buttonLabel
    
eventos:
    - deleteItem

    funcionamiento: Pintar elemento con el texto procedente del elemento value y Cuando el usuario hace click en el botón de borrado, hay que emitir el evento deleteItem, se borra el componente.
    */

const templateElement1 = document.createElement("template");

templateElement1.innerHTML = `
    <style>
    .list-item-wrapper {
        display: flex;
    }
    
    span {
        flex-grow: 1
    }
    </style>
    
    <div class="list-item-wrapper">
    <span></span>
    <button></button>
 
    </div>
    
`;

class ListItem extends HTMLElement {
    constructor() {
    super();

    this.attachShadow({ mode: "open" });
    
    //Lectura de los atributos que vamos atener
    this.value = this.getAttribute('value') || 'Estudiar Programación';
    this.buttonLabel = this.getAttribute('buttonLabel') || '❌';
    }

    connectedCallback() {
    const template = templateElement1.content.cloneNode(true);
    this.shadowRoot.appendChild(template);
        
    const deleteItemElement = this.shadowRoot.querySelector('button');
    const spanElement =  this.shadowRoot.querySelector('span');

    spanElement.textContent = this.value; //Pintamos el span
    deleteItemElement.textContent = this.buttonLabel;  //Pintamos el botón
    
    deleteItemElement.addEventListener('click', () => {
        const inputValue = spanElement.value;  //Recopilamos el dato

        const event = new CustomEvent('deleteItem', {
            detail: inputValue
        })
        this.dispatchEvent(event); //Disparamos el evento
        this.remove()               //Borramos el elemento
        spanElement.value = "";
        })
    }
}

window.customElements.define("list-item", ListItem);