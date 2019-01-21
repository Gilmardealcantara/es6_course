class NegocitationsList {
    constructor () {
        this._list = [];
    }

    add(item) {
        this._list.push(item);
    }

    get negociations() {
        return [].concat(this._list);
    }
}