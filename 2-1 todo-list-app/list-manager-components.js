/* list-manager-components

atributos:
- 
- 

eventos:
- 

funcionamiento: Sincronizar el buscador y el listado de elementos.
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


</div>

`;

class ListItem extends HTMLElement {
    constructor() {
    super();

    this.attachShadow({ mode: "open" });
    

    connectedCallback() {
        const template = templateElement1.content.cloneNode(true);
        this.shadowRoot.appendChild(template);
        }    
    }    
}

window.customElements.define("list-item", ListItem);