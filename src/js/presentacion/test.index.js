
const DashInicio = () => {

	let eventTest = () => {
		
	}

	let receivedEvent = ($el) => {
        console.log("Inicializa la aplicación ready ok")
		$.mobile.linkBindingEnabled = false
		$.mobile.hashListeningEnabled = false
		App.Routers.router = new TestRouter()
		eventTest()
	}

	let initialize = () => {
		$.mobile.loading( "show" );
		let $el = document.getElementById('deviceready')
		receivedEvent($el)
	}

	return {
		"initialize":initialize,
		"receivedEvent": receivedEvent
	}
}

window.addEventListener("load", (event) => {
	window.core = Core;
	window.core.init()
	let dashIndex = DashInicio()
	dashIndex.initialize()
}, false)
