/*
  1- Create a digital-clock component.
  2- Each second, we must calculate the time and update the component HTML
*/

//Creamos la etiqueta template en html
const templateElement = document.createElement('template')
templateElement.innerHTML = `
  
<style>
h1 {
  color: var(--digital-clock-title-color, lightblue)
}
p{
  color: var(--digital-clock-time-color, lightred)
}
</style>

<h1></h1>  
  <p></p>
`;

class DigitalClock extends HTMLElement {

    constructor() {
      super();
      this.attachShadow({ mode: "open" })
    }
  
    connectedCallback() {
      //clonamos el clon del template
      const templateClone = templateElement.content.cloneNode(true);

      //Rellenamos la copia con los datos que queremos
      const currentTime = this.calculateCurrentTime();
      templateClone.querySelector('h1').textContent = 'Reloj Digital con Shadow DOM';
      templateClone.querySelector('p').textContent = currentTime;
      //this.appendChild(templateClone)
      this.shadowRoot.appendChild(templateClone)
      
      setInterval(() => {
        const currentTime = this.calculateCurrentTime();
        this.shadowRoot.querySelector('p').textContent = currentTime //No podemos aplicar el innerHTML porque machacamos todo lo que hay dentro de la etiqueta              
      }, 1000);
    }
    
    calculateCurrentTime() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
     
      return `${hours} : ${minutes} : ${seconds}`
    }
  }
  
  window.customElements.define("digital-clock", DigitalClock);
  