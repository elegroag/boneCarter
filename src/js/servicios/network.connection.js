class NetworkConnection {

    static instancia;
    _net;
    _state;
    _networkState;

    constructor(){
        //si no es false !!
        if( !!NetworkConnection.instancia){
            return NetworkConnection.instancia;
        } 
        this.init()
        NetworkConnection.instancia = this;
        return NetworkConnection.instancia;
    }

    init(){
        this._networkState = (navigator.connection.type).toUpperCase();
        let states = new Array;
		states['UNKNOWN']  = 'Unknown connection';
		states['ETHERNET'] = 'Ethernet connection';
		states['WIFI']     = 'WiFi connection';
		states['CELL_2G']  = 'Cell 2G connection';
		states['CELL_3G']  = 'Cell 3G connection';
		states['CELL_4G']  = 'Cell 4G connection';
		states['CELL']     = 'Cell generic connection';
		states['NONE']     = 'No network connection';
       
		this._state = states[this._networkState] || false
        this._net = (this._networkState == 'NONE')? 'Offline': 'Online'; 
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
