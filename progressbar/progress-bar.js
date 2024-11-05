class ProgressBar extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});

        const template = `
            <style>
                .progress-bar__wrapper {
                    position: relative;
                }

                .progress-bar__value {
                    position: absolute;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }

                progress {
                    width: 100%;
                    height: 20px;
                    border-radius: 50px;
                    background-color: #ddd;
                    transition: width 300ms ease;
                }

                progress[value]::-webkit-progress-bar {
                    width: 100%;
                    height: 20px;
                    border-radius: 50px;
                    background-color: #ddd;
                    transition: width 300ms ease;
                }

                progress[value]::-webkit-progress-value {
                    width: 0;
                    border-radius: 50px;
                    background-color: maroon;
                    transition: width 300ms ease;
                }
            </style>
            <div class="progress-bar__wrapper">
                <label id="progres-bar-label" class="progress-bar__value" htmlFor="progress-bar"> 40% </label>
                <progress id="progress-bar" value="40" max="100"></progress>
            </div>
        `
        this.shadow.innerHTML = template;
        
        this.progressBar = this.shadow.querySelector('progress');
        this.progressBarLabel = this.shadow.querySelector('#progres-bar-label');
    }

    static get observedAttributes() {
        return ['percentage'];
    }

    connectedCallback() {
        this.updateProgress();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === 'percentage' && oldValue !== newValue) {
            this.updateProgress();
        }
    }

    validatePercentage(value) {
        const percentValue = parseInt(value, 10);
        if(isNaN(percentValue) || percentValue < 0 || percentValue > 100) {
            throw new Error('Invalid progress percentage');
        }
        return percentValue;
    }

    updateProgress() {
        const percentageValue = this.validatePercentage(this.getAttribute('percentage'));

        this.progressBar.value = percentageValue;
        this.progressBarLabel.textContent = `${percentageValue}%`;

        this.progressBarLabel.style.color = percentageValue >= 52 ? 'white' : 'black';
    }
}

customElements.define('progress-bar', ProgressBar);