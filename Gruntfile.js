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
       queries: {
        options: {
          apis: grunt.file.readJSON('swagger/gruntfile.json').apis,
          dest: 'lib'
        },
        dist: {}
      }
    },
    jsonlint: {
      all: {
        src: ['package.json', 'swagger/*.json', '.jshintrc']
      }
    },
    run: {
      commands: {
        exec: 'npm run-script download-swagger && npm run-script build'
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
