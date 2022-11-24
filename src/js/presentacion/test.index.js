

window.addEventListener("load", (event) => {
	$.mobile.loading( "show" );
	_router.router = new App.Routers.TestRouter()
}, false)
