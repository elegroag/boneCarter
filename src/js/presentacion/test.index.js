
const DashInicio = () => {

	let eventLogin = () => {

		let loginTarget = $("#pageLogin")

		loginTarget.on('click', '[data-toogle="irlogin"]', (event) => {
			event.preventDefault()
			App.Routers.router.navigate("registro", {trigger: true})
		})

		loginTarget.on('click', '#btnEnviar', (event) => {
			event.preventDefault()
			let _token = window.core.preparaToken("#formLogin")
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

window.addEventListener("load", (event) => {
	let dashIndex = DashInicio()
	dashIndex.initialize()
}, false)
