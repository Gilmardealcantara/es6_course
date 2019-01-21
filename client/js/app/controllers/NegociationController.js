class NegociationController {
    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputQnt = $('#qantidade');
        this._inputDate = $('#data');
        this._inputValue = $('#valor');
    }

    add(evt){
        evt.preventDefault();
        let date = DateHelper.text2Date(this._inputDate.value);        
        let negociation = new Negociation(
            date, 
            this._inputQnt, 
            this._inputValue
        );

        console.log(negociation);
        console.log(DateHelper.date2Text(date));

    } 
}