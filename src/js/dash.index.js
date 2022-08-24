"use strict";

let ConnectionDb = (() => {
	
	let ConnectNetwork = (Callback = void 0) => {
		var networkState = navigator.connection.type;
		var states = {};
		states[Connection.UNKNOWN]  = 'Unknown connection';
		states[Connection.ETHERNET] = 'Ethernet connection';
		states[Connection.WIFI]     = 'WiFi connection';
		states[Connection.CELL_2G]  = 'Cell 2G connection';
		states[Connection.CELL_3G]  = 'Cell 3G connection';
		states[Connection.CELL_4G]  = 'Cell 4G connection';
		states[Connection.CELL]     = 'Cell generic connection';
		states[Connection.NONE]     = 'No network connection';
		return states[networkState] || false
	}
	
	let report = (msj)=> {
		$('#msjPopup').html(msj)
		$( "#popupBasic" ).popup( "option", "arrow" )
	}

	return {
		init: () => {
			ConnectNetwork()
			return true;
		}
	}
})();

var App = {
	Models: {},
	Collections: {},
	Routers: {},
	Views: {}
};

App.Routers = App.Routers || {}

App.Views = App.Views || {}

var InicioRouter = Backbone.Router.extend( {
	initialize: () =>  {
		Backbone.history.start()
	},
	routes: {
		'': 'homePage',
		'login': 'loginAuth',
		'registro': 'registerAuth',
		'start':'startApp'
	},
	homePage: () => {
		console.log('homePage')
		$.mobile.changePage( "#pageIndex" , { reverse: false, changeHash: false } );
		$.mobile.loading( "hide" );
	},

	loginAuth: () => {
		console.log('loginAuth')
		$.mobile.changePage( "#pageLogin" , { reverse: false, changeHash: false } );
	},

	registerAuth: () => {
		console.log('registerAuth')
		$.mobile.changePage( "#pageRegistro" , { reverse: false, changeHash: false } );
	},

	startApp: () => {
		console.log('startApp')
		$.mobile.changePage( "#pageStart" , { reverse: false, changeHash: false } );
		let identification = sessionStorage.getItem('identification')
		let type = sessionStorage.getItem('type')
		$("#textStartApe").html(`<p>Usuario en sesión ${identification} tipo: ${type}</p>`)
	}
})

const DashInicio = () => {

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

	let eventLogin = () => {

		let loginTarget = $("#pageLogin")

		loginTarget.on('click', '[data-toogle="irlogin"]', (event) => {
			event.preventDefault()
			App.Routers.router.navigate("registro", {trigger: true})
		})

		loginTarget.on('click', '#btnEnviar', (event) => {
			event.preventDefault()
			let _token = preparaToken("#formLogin")
			buscarUsuario(_token)
			console.log(JSON.stringify(_token))
		})
	}

	let buscarUsuario = (token) => {
		sessionStorage.setItem('identification', token.identification)
		sessionStorage.setItem('type', token.type_document)
		App.Routers.router.navigate("start", {trigger: true})
	}

	let receivedEvent = ($el) => {
        console.log("Inicializa la aplicación ready ok")
		$.mobile.linkBindingEnabled = false
		$.mobile.hashListeningEnabled = false
		App.Routers.router = new InicioRouter()
		eventLogin()
	}

	let initialize = () => {
		$.mobile.loading( "show" );
		let connect = ConnectionDb
		console.log('connect', connect.init())
		let $el = document.getElementById('deviceready')
		receivedEvent($el)
	}

	return {
		"initialize":initialize,
		"receivedEvent": receivedEvent
	}
}

document.addEventListener("deviceready", (event) => {
	let dashIndex = DashInicio()
	dashIndex.initialize()
}, false)

// window.addEventListener("load", (event) => {
// 	let dashIndex = DashInicio()
// 	dashIndex.initialize()
// }, false)
