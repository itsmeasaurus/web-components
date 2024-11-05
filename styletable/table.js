class Table extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const tableHeaders = this.dataset.headers.split(',').map(header => header.trim())
        this.shadowRoot.innerHTML = `
            <style>
                table {
                    border-collapse: collapse;
                    font-size: 0.8rem;
                    min-width: 400px;
                }
                thead tr {
                    background: aqua;
                    color: blueviolet;
                    text-align: center;
                }
                th,td {
                    font-weight: bold;
                    padding: 20px;
                }
                tbody tr {
                    border-bottom: 1px solid #111;
                }
                tbody tr:nth-child(event) {
                    background-color: aquamarine;
                }
            </style>
            <table>
                <thead>
                    <tr>
                        ${tableHeaders.map(header => `<th>${header}</th>`).join('')}
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `
    }

    /**
     *
     * @param data {string[][]}
     */
    set data(data) {
        const tableBody = this.shadowRoot.querySelector('tbody');
        const rows = data.map(rowData => {
            const row = document.createElement('tr');
            const cells = rowData.map(cellData => {
                const cell = document.createElement('td');
                cell.textContent = cellData;
                return cell;
            })
            row.append(...cells);
            return row;
        })
        tableBody.append(...rows)
    }
}

customElements.define('style-table', Table);