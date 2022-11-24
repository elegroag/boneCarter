
class Procesador {

    procesarOnline = ProcesarOnline;
    procesarOffline = ProcesarOffline;
    procesador = void 0;

    constructor(){
        window.core = Core
        window.core.init()
        let red = window.core.network();
        if( red.net == 'Online'){
            this.procesador = this.procesarOnline;
        } else {
            this.procesador = this.procesarOffline;
        }
    }

    procesar(params, callback){
        this.procesador.procesar(params, callback);
    }

    online(){
        this.procesador = this.procesarOnline;
    }

    offline(){
        this.procesador = this.procesarOffline;
    }
}