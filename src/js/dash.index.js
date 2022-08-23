"use strict";

let ConnectionDb = (() => {
	let db;

	let Connect = (Callback = void 0) => {
	}

	let Errores = (e) => {
		console.log('Error: '+e.target.error)
	}

	let SuccessDb = (tx) => {
	}

	let searchData = (e) => {
	}

	let report = (msj)=> {
		$('#msjPopup').html(msj)
		$( "#popupBasic" ).popup( "option", "arrow" )
	}

	return {
		init: () => {
			Connect(SuccessDb)
			return true;
		}
	}
})();

var App = {
	Models: {},
	Collections: {},
	Routers: {}
};

App.Routers = App.Routers || {}

var DashRouter = Backbone.Router.extend( {
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

	startApp: () =>  {
		alert('startApp')
	}
})


const DashIndex = () => {

	let onDeviceReady = () => {
		$.mobile.loading( "show" );
		let $el = document.getElementById('deviceready')
		receivedEvent($el)
	}

	let receivedEvent = ($el) => {
        console.log("Inicializa la aplicación ready ok")
		$.mobile.linkBindingEnabled = false;
		$.mobile.hashListeningEnabled = false;
		App.Routers.router = new DashRouter()
	}

	let initialize = () => {
		//document.addEventListener('deviceready', onDeviceReady, false);
		window.addEventListener('deviceready', onDeviceReady, false)
	}

	return {
		"initialize":initialize,
		"onDeviceReady": onDeviceReady,
		"receivedEvent": receivedEvent
	}
}

let dashIndex = DashIndex()
dashIndex.initialize()