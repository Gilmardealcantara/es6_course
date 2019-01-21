class NegociationController {
    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputQnt = $('#qantidade');
        this._inputDate = $('#data');
        this._inputValue = $('#valor');
    }

    add(evt){
        evt.preventDefault();        
        let negociation = new Negociation(
            new Date(...this._inputDate.value.split('-').map((v, i) =>  v - i%2)), 
            this._inputQnt, 
            this._inputValue
        );

        console.log(negociation);

    } 
}