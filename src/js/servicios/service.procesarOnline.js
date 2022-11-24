//modulo de ProcesarOnline 
const ProcesarOnline = ((win) => {
    
    const procesarDatos = () => {
        console.log('Procesar datos en online o remoto')
    }

    return {
        init : () => {
        },
        procesar: () => {
            procesarDatos()
        }
    }
})(window);