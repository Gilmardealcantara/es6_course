class NegociationsService {
    constructor() {
        this._http = new HttpService();
    }

    getWeek() {
        return new Promise((resolve, reject) => {
            this._http.get('/negociacoes/semana').then(negociations => {
                resolve(negociations.map((obj) => new Negociation(new Date(obj.data), obj.quantidade, obj.valor)));
            }).catch(erro => reject(error));
        });
    }

    getLastWeek() {
        return new Promise((resolve, reject) => {
            this._http.get('/negociacoes/anterior').then(negociations => {
                resolve(negociations.map((obj) => new Negociation(new Date(obj.data), obj.quantidade, obj.valor)));
            }).catch(erro => reject(error));
        });
    }

    getLastLastWeek() {
        return new Promise((resolve, reject) => {
            this._http.get('/negociacoes/retrasada').then(negociations => {
                resolve(negociations.map((obj) => new Negociation(new Date(obj.data), obj.quantidade, obj.valor)));
            }).catch(erro => reject(error));
        });
    }
    getNeciationsByWeek(cb) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/negociacoes/semana');
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    console.log("Response Ok");
                    cb(null, JSON.parse(xhr.responseText).map((obj) => new Negociation(new Date(obj.data), obj.quantidade, obj.valor)));
                } else {
                    cb('Error to negociations get')
                }
            }
        };
        xhr.send();
    }

    postNegociation(negociation, cb) {
        this._http.post('/negociacoes', {
            data: negociation.date,
            quantidade: negociation.qnt,
            valor: negociation.value
        }).then(() => cb(null))
            .catch((error) => cb(error));
    }
}