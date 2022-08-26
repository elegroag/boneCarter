class Connection {

    static instancia;
    table = 'hospireBone';
    version = '1.0';
    detalle = 'Esto es un repositorio local para la persistencia de los datos locales';
    timeout = (5*1024*1024);
    db = void 0;

    constructor(){
        //si no es false !!
        if( !!Connection.instancia){
            return Connection.instancia;
        } 
        this.db = window.openDatabase(this.table, this.version, this.detalle, this.timeout)
        Connection.instancia = this;
        return Connection.instancia;
    }

    get db(){
        return this.connect;
    }
}
const connection = new Connection();
const InstanciaDb = connection.db;
console.log(InstanciaDb)