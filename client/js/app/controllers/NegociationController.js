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
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/negociacoes/semana');
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    console.log("Response Ok");
                    console.log(JSON.parse(xhr.responseText));
                    JSON.parse(xhr.responseText)
                        .map((obj) => new Negociation(new Date(obj.data), obj.quantidade, obj.valor))
                        .forEach(negociation => this._negociationsList.add(negociation));
                    this._message.text = 'Success in negociations get';
                } else {
                    console.log("Erro in server");
                    this._message.text = 'Error to negociations get.';
                }
            }
        };
        xhr.send();
    }
}



