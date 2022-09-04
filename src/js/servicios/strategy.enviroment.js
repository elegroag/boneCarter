
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

    const init = () => {
        connection = new Connection();
        win.InstanciaDb = connection.db;
        console.log(win.InstanciaDb)
    }

    const procesarDatos = ()=> {
        console.log('Procesar datos en credito')
    }

    return {
        procesar: () => {
            init()
            procesarDatos()
        }
    }
})(window);


class _Procesador {

    procesarOnline = ProcesarOnline;
    procesarOffline = ProcesarOffline;
    procesador = void 0;

    constructor(){
        let red = window.core.network();
        if( red.net == 'Online'){
            this.procesador = this.procesarOnline;
        } else {
            this.procesador = this.procesarOffline;
        }
    }

    procesar(){
        this.procesador.procesar();
    }
}