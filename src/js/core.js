
const Core = ((Backbone, $) => { 
	let networkConnection;

	const onOffline = () => {
		let networkState = navigator.connection.type;
		networkConnection.change('Offline', networkState, false)
    	console.log("lost connection");
	}

	const onOnline = () => {
		let networkState = navigator.connection.type;
    	if (networkState !== Connection.NONE) {
			networkConnection.change('Online', networkState, true)
			console.log("connection OK");
    	}else{
			networkConnection.change('Offline', networkState, false)
		}
	}

	let preparaToken = (formulario) => {
		let _data_array = $(formulario).serializeArray()
		let _token = {}
		let $i = 0
		while ($i < _.size(_data_array)) {
			_token[_data_array[$i].name] = _data_array[$i].value;
			$i++;
		}
		return _token;
	}

	let lanzarEventos =  () => {
		document.addEventListener("offline", onOffline, false);
		document.addEventListener("online", onOnline, false);
	}

	let init = (options = {}) => {
		$.mobile.linkBindingEnabled = false
		$.mobile.hashListeningEnabled = false
		networkConnection = new NetworkConnection();
		lanzarEventos()
	}

	let getNetwork = () => {
		return networkConnection;
	}

	return {
		'init': init,
		'network': getNetwork,
		'preparaToken': preparaToken
	}
})(Backbone, jQuery)