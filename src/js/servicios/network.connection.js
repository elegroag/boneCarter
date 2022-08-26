class NetworkConnection {

    static instancia;
    net = 'Offline';

    constructor(){
        //si no es false !!
        if( !!NetworkConnection.instancia){
            return Connection.instancia;
        } 
        
        NetworkConnection.instancia = this;
        return NetworkConnection.instancia;
    }

    get net(){
        return this.net;
    }

    set net(status){
        this.net = status;
    }
}
const networkConnection = new NetworkConnection();
console.log(networkConnection)