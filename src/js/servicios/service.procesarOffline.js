//modulo de ProcesarOffline
const ProcesarOffline = ((win) => {

    let red;

    const procesarDatos = (callback) => {
        console.log('Procesar datos en offline o remoto')
    }

    const sincronizarDatos = (callback) => {
        let tablas = win.core.initDb.tablas;
        red = window.core.network();
        if( red.net == 'Online'){
            
        }
    }

    return {
        init : () => {
        },
        procesar: (params, callback) => {
            
        },
        "sincronizar" : sincronizarDatos
    }
})(window);
