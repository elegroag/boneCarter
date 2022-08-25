"use strict";

module.exports = function (grunt) {
	require("time-grunt")(grunt);
	require('load-grunt-tasks')(grunt);

	grunt.loadNpmTasks("grunt-concat-css");
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		concat: {
			resources: {
				src: [
					"node_modules/jquery/dist/jquery.js",
					"node_modules/jquery-mobile/dist/jquery.mobile.js",
					"node_modules/underscore/underscore-umd.js",
                    "node_modules/backbone/backbone.js"
				],
				dest: "src/cp/build.resources.js"
			}
		},
		babel: {
			options: {
			  	presets: ['@babel/preset-env']
			},
			dist: {
			  	files: [{
					expand: true,
					cwd: "src/js/",
					src: ['**/*.js'],
					dest: 'www/static/js'
				}]
			}
		},
		concat_css: {
			options: {
			},
			all: {
				src: [
					"node_modules/jquery-mobile/dist/jquery.mobile.structure.css",
					"node_modules/jquery-mobile/dist/jquery.mobile.icons.css",
					"src/css/theme.css"
				],
				dest: "www/static/css/build.styles.css",
			}
		},
		uglify: {
			dist: {
                files: [{
					expand: true,
					cwd: "src/cp/",
					src: ['**/*.js'],
					dest: 'www/static/js'
				}]
            }
		},
		watch: {
            files: [
                '<%= uglify.dist.files %>',
				'<%= babel.dist.files %>'
            ],
            tasks: [
                'uglify',
				'babel'
            ]
        },
		copy: {
			main: {
				files: [
					{
						expand: true, 
						cwd: "node_modules/underscore/",
						src: "underscore-umd.js.map", 
						dest: "www/static/js/", 
						filter: "isFile"
					},
					{
						expand: true, 
						cwd: "src/images/",
						src: ['**'], 
						dest: "www/static/img/"
					},
					{
						expand: true, 
						cwd: "src/fonts/",
						src: ['**'], 
						dest: "www/static/fonts/"
					}
				]
			}
		}
	});

	grunt.registerTask("default", [
		//"concat",
		"babel", 
		//"concat_css",
		"uglify"
	]);
};
