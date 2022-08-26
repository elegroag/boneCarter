//se definen las rutas de login y registro


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