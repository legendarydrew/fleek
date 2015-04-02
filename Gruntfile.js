// Grunt = JavaScript running in node.js.
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		// sass
		// Compile SASS files into CSS.
		sass: {
			dist: {
				options: {
					style: 'compact'
				},
				files: {
					'css/fleek.css': 'scss/app.scss',
				}
			}
    	}

	}); // The end of grunt.initConfig

	grunt.loadNpmTasks('grunt-contrib-sass');

	// Task aliases.
	grunt.registerTask('build', ['sass']);
};