class NegociationsService {
    neciationsByWeek(cb) {
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
}