class NegociationsService {
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
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/negociacoes", true);
        xhr.setRequestHeader("Content-type", "application/json");

        xhr.onreadystatechange = () => {

            if (xhr.readyState == 4) {

                if (xhr.status == 200) {
                    cb(null)
                } else {
                    cb(`Erro to send negociation: ${xhr.responseText}`);
                }
            }
        }

        xhr.send(JSON.stringify({
            data: negociation.date,
            quantidade: negociation.qnt,
            valor: negociation.value
        }));
    }
}