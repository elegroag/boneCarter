const Views = App.Views;

App.Routers.TestRouter = Backbone.Router.extend( {
	views: {},
	initialize: () =>  {
		Backbone.history.start()
	},
	routes: {
		'': 'testPage',
	},
	testPage: () => {
		console.log('testPage')
		$.mobile.changePage( "#pageTest" , { reverse: false, changeHash: false } );
		_view.test = new Test()
		$.mobile.loading( "hide")
	}
})