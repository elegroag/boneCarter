"use strict";

class NetworkConnection {

    static instancia;
    net = 'Offline';
    state;
    networkState;

    constructor(){
        //si no es false !!
        if( !!NetworkConnection.instancia){
            return Connection.instancia;
        } 
        this.init()
        NetworkConnection.instancia = this;
        return NetworkConnection.instancia;
    }

    init(){
        networkState = navigator.connection.type;
		states[Connection.UNKNOWN]  = 'Unknown connection';
		states[Connection.ETHERNET] = 'Ethernet connection';
		states[Connection.WIFI]     = 'WiFi connection';
		states[Connection.CELL_2G]  = 'Cell 2G connection';
		states[Connection.CELL_3G]  = 'Cell 3G connection';
		states[Connection.CELL_4G]  = 'Cell 4G connection';
		states[Connection.CELL]     = 'Cell generic connection';
		states[Connection.NONE]     = 'No network connection';
		this.state = states[networkState] || false
    }

    change(net, networkState, state){
        this.net = net;
        this.state = state;
        this.networkState = networkState;
    }

    get state(){
        return this.state;
    }

    get networkState(){
        return $this.networkState;
    }

    get net(){
        return this.net;
    }

    set net(status){
        this.net = status;
    }
}
