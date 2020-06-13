class NegociationController {
    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputQnt = $('#quantidade');
        this._inputDate = $('#data');
        this._inputValue = $('#valor');
        this._negociationService = new NegociationsService();

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
            parseInt(this._inputQnt.value),
            parseFloat(this._inputValue.value)
        );
    }

    add(evt) {
        evt.preventDefault();
        var negociation = this._negociationFactory();
        this._negociationService.postNegociation(negociation, (error) => {
            if (!error) {
                ConnectionFactory.getConnection()
                    .then(connection => {
                        new NegociationDao(connection)
                            .add(negociation)
                            .then(() => {
                                this._negociationsList.add(negociation);
                                this._message.text = "Add Negociation - Success !!! ";
                                this._formClear();
                            })
                    }).catch(error => this._message.text = error)

            } else {
                this._message.text = error;
            }
        })
    }

    getDataApi() {
        Promise.all([
            this._negociationService.getWeek(),
            this._negociationService.getLastWeek(),
            this._negociationService.getLastLastWeek()
        ]).then(negociations => {
            negociations.reduce((arrayFlat, array) => arrayFlat.concat(array), [])
                .forEach(negociation => this._negociationsList.add(negociation));
            this._message.text = 'Success in negociations get';
        }).catch(error => console.log(error))
    }
}



