module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		uglify: {
		  options: {
		    // the banner is inserted at the top of the output
		    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
		  },
		  js: {
		    src: ['app/inc/js/main.js'],
		    dest: 'public/js/min.js',
		  },
		},

		sass: {                              // Task
		    dist: {                            // Target
		      options: {                       // Target options
		        style: 'expanded'
		      },
		      files: {                         // Dictionary of files
		        'public/css/style.css': 'app/inc/sass/style.scss',       // 'destination': 'source'
		      }
		    }
		  },

		watch: {
		  scripts: {
		    files: ['app/inc/js/*.js',
		    		'app/inc/sass/**/*'],
		    tasks: ['uglify', 'sass'],
		    options: {
		      spawn: false,
		    },
		  },
		},
			

	});
	
	
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.loadNpmTasks('grunt-contrib-watch');
	 // Default task(s).
  	grunt.registerTask('default', ['uglify']);

};