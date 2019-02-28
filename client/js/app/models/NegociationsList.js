class NegocitationsList {
    constructor (trap) {
		this._list = [];
		this._trap = trap;
    }

    add(item) {
		this._list.push(item);
		this._trap();
    }

    get negociations() {
        return [].concat(this._list);
    }
    
    removeAll() {
	   	this._list = [];
		this._trap();
    }
}
