class NegociationController {
    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputQnt = $('#quantidade');
        this._inputDate = $('#data');
        this._inputValue = $('#valor');
        this._negociationsList = new NegocitationsList(); 
        this._negociationsView = new NegociationView($('#negociationsView'));
        this._negociationsView.update(this._negociationsList);

        this._message = new Message();
        this._messageView = new MessageView($('#messageView'));
        this._messageView.update(this._message);
    }

    _formClear(){
        this._inputDate.value = '';
        this._inputQnt.value = 1;
        this._inputValue.value = 0.0;
        this._inputDate.focus();
    }

    clean() {
      this._negociationsList.removeAll();
      this._negociationsView.update(this._negociationsList);
      this._message.text = "Remove all negociations successfully";
      this._messageView.update(this._message);
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
        this._negociationsView.update(this._negociationsList);

        this._message.text = "Add Negociation - Success !!! ";
        this._messageView.update(this._message);
        this._formClear();
    } 
}
