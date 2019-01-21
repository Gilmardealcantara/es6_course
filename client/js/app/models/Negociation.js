class Negociation {
    constructor (date, qnt, value) {
        this._date = new Date(date.getTime());
        this._qnt = qnt;
        this._value = value;
        Object.freeze(this);
    }

    get volume() {
        return this._qnt * this._value;
    }

    get date() {
        return new Date(this._date.getTime());
    }
    get qnt() {
        return this._qnt;
    }
    
    get value() {
        return this._value;
    }
    
    
}