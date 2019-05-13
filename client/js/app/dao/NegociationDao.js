class NegociationDao {
    constructor(connection) {
        this._connection = connection;
        this._store = 'negociations';
    }

    add(negociation) {
        return new Promise((resolve, reject) => {
            let request = this
                ._connection
                .transaction([this._store], "readwrite")
                .objectStore(this._store)
                .add(negociation);

            request.onsuccess = (e) => {

                resolve();
            };

            request.onerror = e => {

                console.log(e.target.error);
                reject('Could not add a negotiation');
            };
        });
    }
}