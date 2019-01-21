class NegociationView {
    constructor (element) {
        this._element = element;
    }

    update(model) {
        this._element.innerHTML = this._template(model);
    }
    
    _template(model) {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            
            <tbody>
            ${model.negociations.map(n => {
                return `
                    <tr>
                        <td>${DateHelper.date2Text(n.date)}</td>
                        <td>${n.qnt}</td>
                        <td>${n.value}</td>
                        <td>${n.volume}</td>
                    </tr>
                `
            }).join('')}
            </tbody>
            
            <tfoot>
            </tfoot>
        </table>
        `;
    }
}