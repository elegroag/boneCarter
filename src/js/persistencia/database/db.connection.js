class Connection {

    static instancia;
    _dbname = 'hospireBone';
    _version = '1.0';
    _detalle = 'Esto es un repositorio local para la persistencia de los datos locales';
    _timeout = (5*1024*1024);
    _db = void 0;

    constructor(){
        //si no es false !!
        if( !!Connection.instancia){
            return Connection.instancia;
        } 
        this._db = window.openDatabase(this._dbname, this._version, this._detalle, this._timeout)
        Connection.instancia = this;
        return Connection.instancia;
    }

    get db(){
        return this._db;
    }
}