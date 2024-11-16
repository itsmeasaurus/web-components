export default class MyCounter extends HTMLElement {  

    constructor() {
        super();
        this.attachShadow({mode: 'open'});

        this.initial = this.getAttribute('initial') || 0;
        this.count = parseInt(this.initial);

        this.render();
        this.setUpEvents();
    }

    static get observedAttributes() {
        return ['initial'];
    }


    attributechangedCallback(name, oldValue, newValue) {
        if(name === 'initial') {
            this.initial = parseInt(newValue);
            this.count = this.initial;
            this.render();
        }
    }

    async render() {
        this.shadowRoot.innerHTML = `
            <button id="decrement" disabled="true">-</button>
            <span>${this.count}</span>
            <button id="increment">+</button>
        `;
    }

    async setUpEvents() {

        this.shadowRoot.querySelector('#increment').addEventListener('click', async () => {
            this.count++;
            await this.evaluateDecrementButton();
            this.shadowRoot.querySelector('span').innerText = this.count;
        });

        this.shadowRoot.querySelector('#decrement').addEventListener('click', async () => {
            this.count--;
            await this.evaluateDecrementButton();
            this.shadowRoot.querySelector('span').innerText = this.count;
        });
    }

    async evaluateDecrementButton() {
        if(this.count === 0) {
            this.shadowRoot.querySelector('#decrement').disabled = true;
        } else {
            this.shadowRoot.querySelector('#decrement').disabled = false;
        }
    }
}

customElements.define('my-counter', MyCounter);