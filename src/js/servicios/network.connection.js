"use strict";

class NetworkConnection {

    static instancia;
    _net = 'Offline';
    _state;
    _networkState;

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
        this._networkState = navigator.connection.type;
        let states = new Array;
		states[Connection.UNKNOWN]  = 'Unknown connection';
		states[Connection.ETHERNET] = 'Ethernet connection';
		states[Connection.WIFI]     = 'WiFi connection';
		states[Connection.CELL_2G]  = 'Cell 2G connection';
		states[Connection.CELL_3G]  = 'Cell 3G connection';
		states[Connection.CELL_4G]  = 'Cell 4G connection';
		states[Connection.CELL]     = 'Cell generic connection';
		states[Connection.NONE]     = 'No network connection';
		this._state = states[this._networkState] || false
    }

    change(net, networkState, state){
        this._net = net;
        this._state = state;
        this._networkState = networkState;
    }

    get state(){
        return this._state;
    }

    get networkState(){
        return this._networkState;
    }

    get net(){
        return this._net;
    }

    set net(status){
        this._net = status;
    }
}
