class NegociationController {
    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputQnt = $('#quantidade');
        this._inputDate = $('#data');
        this._inputValue = $('#valor');

        this._negociationsList = new Bind(
            new NegocitationsList(),
            new NegociationView($('#negociationsView')),
            'add', 'removeAll');

        this._message = new Bind(
            new Message(),
            new MessageView($('#messageView')),
            'text');
    }

    _formClear() {
        this._inputDate.value = '';
        this._inputQnt.value = 1;
        this._inputValue.value = 0.0;
        this._inputDate.focus();
    }

    clean() {
        this._negociationsList.removeAll();
        this._message.text = "Remove all negociations successfully";
    }

    _negociationFactory() {
        return new Negociation(
            DateHelper.text2Date(this._inputDate.value),
            this._inputQnt.value,
            this._inputValue.value
        );
    }

    add(evt) {
        evt.preventDefault();
        this._negociationsList.add(this._negociationFactory());

        this._message.text = "Add Negociation - Success !!! ";
        this._formClear();
    }

    getDataApi() {
        let service = new NegociationsService();
        service.neciationsByWeek((err, negociations) => {
            if (err) {
                this._message.text = 'Error to negociations get.';
            } else {
                negociations.forEach(negociation => this._negociationsList.add(negociation));
                this._message.text = 'Success in negociations get';
            }
        });
    }
}



