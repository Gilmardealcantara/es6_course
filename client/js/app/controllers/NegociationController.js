class NegociationController {
    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputQnt = $('#quantidade');
        this._inputDate = $('#data');
        this._inputValue = $('#valor');
			
		this._negociationsList = ProxyFactory.create (
			new NegocitationsList(),
			['add', 'removeAll'], model =>
			this._negociationsView.update(model));

        this._negociationsView = new NegociationView($('#negociationsView'));
        this._negociationsView.update(this._negociationsList);

		this._message = ProxyFactory.create(
			new Message(), ['text'], model =>
			this._messageView.update(model));
        this._messageView = new MessageView($('#messageView'));
    }

    _formClear(){
        this._inputDate.value = '';
        this._inputQnt.value = 1;
        this._inputValue.value = 0.0;
        this._inputDate.focus();
    }

    clean() {
      this._negociationsList.removeAll();
      this._message.text = "Remove all negociations successfully";
    }
      
    _negociationFactory(){
        return new Negociation(
            DateHelper.text2Date(this._inputDate.value), 
            this._inputQnt.value, 
            this._inputValue.value
        );
    }

    add(evt){
        evt.preventDefault();
        this._negociationsList.add(this._negociationFactory());

        this._message.text = "Add Negociation - Success !!! ";
        this._formClear();
    } 
}
