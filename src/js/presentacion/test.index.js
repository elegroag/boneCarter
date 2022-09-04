

window.addEventListener("load", (event) => {
	$.mobile.loading( "show" );
	window.core = Core;
	window.core.init()
	_router.router = new App.Routers.TestRouter()
}, false)
