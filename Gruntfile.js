/*
 * grunt-timestamp-release
 * https://github.com/kyrstenkelly/grunt-timestamp-release
 *
 * Copyright (c) 2014 Kyrsten
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    timestamp_release: {
      options: {
        pushTo: 'origin'
      },
      default_options: {
        options: {}
      },
      custom_options: {
        options: {
          files: ['package.json'],
          commit: true,
          commitMessage: 'Release <%= timestamp %>',
          tag: true,
          tagFormat: 'YYYY-MM-DD--hh-mm',
          tagMessage: 'Release <%= timestamp %>',
          push: true,
          pushTo: 'upstream'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'timestamp_release', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
