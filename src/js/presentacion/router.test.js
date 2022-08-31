

var TestRouter = Backbone.Router.extend( {
	initialize: () =>  {
		Backbone.history.start()
	},
	routes: {
		'': 'testPage',
	},
	testPage: () => {
		console.log('testPage')
		$.mobile.changePage( "#pageTest" , { reverse: false, changeHash: false } );
		$.mobile.loading( "hide" );
	}
})