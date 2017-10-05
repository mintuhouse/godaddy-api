module.exports = function(grunt) {
  'use strict';
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['Gruntfile.js', 'lib/godaddy.js', 'test/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    'swagger-js-codegen': {
      options: {
        apis: grunt.file.readJSON('swagger/gruntfile.json'),
        dest: 'lib'
      },
      dist: {}
    },
    jsonlint: {
      all: {
        src: ['package.json', 'swagger/*.json', '.jshintrc']
      }
    },
    'run': {
      your_target: {
        cmd: 'node',
        args: [
          'download-swagger.js'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-swagger-js-codegen');
  grunt.loadNpmTasks('grunt-run');

  // Default task.
  grunt.registerTask('default', [
    'jsonlint',
    'jshint',
    'run',
    'swagger-js-codegen'
  ]);
};
