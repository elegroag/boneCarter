
//modulo de ProcesarPagosEfectivo 
const ProcesarOnline = ((win, db) => {
    
    let datos;

    const procesarDatos = ()=> {
        console.log('Procesar datos en efectivo', db.nombre)
        db.nombre = "Alan"
    }

    return {
        init : () => {
        },
        procesar: () => {
            procesarDatos()
        }
    }
})(window, instancia);

//modulo de ProcesarPagosCredito
const ProcesarOffline = ((win, db) => {

    let datos;

    const procesarDatos = ()=> {
        console.log('Procesar datos en credito', db.nombre)
    }
    return {
        init : () => {
        },
        procesar: () => {
            procesarDatos()
        }
    }
})(window, instancia);

//metodo de contexto
const AmbenteProcesar = {
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