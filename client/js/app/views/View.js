class View {
    constructor(element) {
        this._element = element;
    }

    update(model) {
        this._element.innerHTML = this.template(model)
    }

    template() {
        throw new Error('The "template" method has to be implemented !!!');
    }
}