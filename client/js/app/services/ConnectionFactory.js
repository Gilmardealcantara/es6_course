// A) O método getConnection() será um método estático, ou seja, invocado diretamente na classe.
// B) O retorno de getConnection será uma promise, pois a abertura de uma conexão é um processo assíncrono.
// C) Não importa quantas vezes seja chamado o método getConnection(), a conexão retornada deve ser a mesma.
// D) Toda conexão possui o método close(), mas o programador não pode chamá-lo, porque a conexão é a mesma para a aplicação inteira. Só o próprio ConnectionFactory pode fechar a conexão.

const ConnectionFactory = (function () {
    const version = 1;
    const stores = ['negociations'];
    const dbName = 'dbframe';
    let connection = null;
    let close = null;

    return class ConnectionFactory {

        constructor() {
            throw new Error('Not is possible create ConnectionFactory instance.');
        }

        static getConnection() {
            return new Promise((resolve, reject) => {

                let openRequest = window.indexedDB.open(dbName, version);

                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._createStores(e.target.result);
                };

                openRequest.onsuccess = e => {
                    if (!connection) {
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        connection.close = function () {
                            throw new Error('Not permited close this global connetion directly');
                        }
                    }
                    resolve(connection);
                };

                openRequest.onerror = e => {
                    console.log(e.target.error);
                    reject(e.target.error.name);
                };
            });
        }

        static _createStores(connection) {
            stores.forEach(store => {
                if (connection.objectStoreNames.contains(store))
                    connection.deleteObjectStore(store);
                connection.createObjectStore(store, { autoIncremente: true });
            });
        }

        static closeConnection() {
            close();
            connection = null;
        }

    }
})();