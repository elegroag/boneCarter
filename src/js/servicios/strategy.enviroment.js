
//modulo de ProcesarPagosEfectivo 
const ProcesarOnline = ((win) => {
    
    let datos;

    const procesarDatos = ()=> {
        console.log('Procesar datos en efectivo')
    }

    return {
        init : () => {
        },
        procesar: () => {
            procesarDatos()
        }
    }
})(window);

//modulo de ProcesarPagosCredito
const ProcesarOffline = ((win) => {

    let datos;
    let connection;

    const procesarDatos = ()=> {
        console.log('Procesar datos en credito')
    }

    return {
        init : () => {
            connection = new Connection();
            win.InstanciaDb = connection.db;
            console.log(instanciaDb)
        },
        procesar: () => {
            procesarDatos()
        }
    }
})(window);

//metodo de contexto
const AmbienteProcesar = {
    procesarOnline: () => {
        let procesarPagos = ProcesarOnline;
        procesarPagos.init();
        procesarPagos.procesar();
    },
    procesarOffline: () => {
        let procesarPagos = ProcesarOffline;
        procesarPagos.init();
        procesarPagos.procesar();
    }
}
//metodo receptor de cliente