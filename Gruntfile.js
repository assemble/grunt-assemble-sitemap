/*
 * Assemble Plugin: Sitemap
 * https://github.com/hariadi/assemble-sitemap
 *
 * Copyright (c) 2014 Hariadi Hinta, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true
      },
      all: ['Gruntfile.js', 'sitemap.js']
    },

    assemble: {
      options: {
        plugins: ['./sitemap.js']
      },
      sitemap: {
        files: [
          {
            expand: true, 
            cwd: 'test/fixtures/pages', 
            src: ['**/*.hbs'], 
            dest: 'test/actual/sitemap'
          }
        ]
      },
      sitemap_option: {
        options: {
          sitemap: {
            homepage: 'http://assemble.io',
            changefreq: 'daily',
            priority: '0.8',
            exclude: ['50x', 'foo'],
            robot: false
          }
        },
        files: [
          {
            expand: true, 
            cwd: 'test/fixtures/pages', 
            src: ['**/*.hbs'], 
            dest: 'test/actual/sitemap_option'
          }
        ]
      },
      sitemap_relative: {
        options: {
          sitemap: {
            homepage: 'http://assemble.io',
            changefreq: 'daily',
            priority: '0.8',
            exclude: ['50x', 'foo'],
            robot: false,
            relativedest: true
          }
        },
        files: [
          {
            expand: true,
            cwd: 'test/fixtures/pages',
            src: ['**/*.hbs'],
            dest: 'test/actual/sitemap_relative'
          }
        ]
      },
      sitemap_dest: {
        options: {
          sitemap: {
            homepage: 'http://assemble.io',
            exclude: ['**/articles/**'],
            relativedest: true,
            dest: 'test/actual/sitemap_dest'
          }
        },
        files: [
          {
            expand: true,
            cwd: 'test/fixtures/pages',
            src: ['**/*.hbs'],
            dest: 'test/actual/sitemap_dest'
          }
        ]
      }
    },

    // Before generating new files, remove any files from previous build.
    clean: {
      actual: ['test/actual/**'],
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-readme');
  grunt.loadNpmTasks('assemble');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'clean', 'assemble']);
};
