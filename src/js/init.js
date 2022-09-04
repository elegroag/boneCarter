"use strict";

Backbone.$ = $;

var Modulos = {};
var Cruds = {};
var App = {
	Models: {},
	Collections: {},
	Routers: {},
	Views: {}
};

window.InstanciaDb = null;
var _view = [];
var _model = [];
var _collection = [];
var _router = [];