class NegociationView extends View{
    
    template(model) {
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
            ${model.negociations.map(n => `
                <tr>
                    <td>${DateHelper.date2Text(n.date)}</td>
                    <td>${n.qnt}</td>
                    <td>${n.value}</td>
                    <td>${n.volume}</td>
                </tr>
            `).join('')}
            </tbody>
            <tfoot>
                <td colspan="3"></td>
                <td>${model.negociations.reduce((res, obj) => res + obj.volume, 0.0)}</td>
            </tfoot>
        </table>
        `;
    }
}