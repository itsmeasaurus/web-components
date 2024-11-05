class Table extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set data(data) {
        this._data = data;
        this._headers = Object.keys(this._data[0])
        this.render()
    }

    connectedCallback() {
        if (this._data) {
            this.render();
        }
    }

    render()
    {
        const template = `
        <style>
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 10px 0;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
          }
          th {
            background-color: #f2f2f2;
            text-align: left;
          }
        </style>
        <table>
            <thead></thead>
            <tbody></tbody>
        </table>
        `;
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.innerHTML = template;

        const tableHead = this.shadowRoot.querySelector('thead');
        const tableHeadCells = this._headers.map(header => `<th>${header}</th>`).join('');
        tableHead.innerHTML = `<tr>${tableHeadCells}</tr>`;

        const tableBody = this.shadowRoot.querySelector('tbody');
        const tableBodyRows = this._data.map(row => {
            const tableBodyCells = this._headers.map(header => `<td>${row[header]}</td>`).join('');
            return `<tr>${tableBodyCells}</tr>`;
        }).join('');
        tableBody.innerHTML = tableBodyRows;

    }
}

customElements.define('dynamic-table', Table);