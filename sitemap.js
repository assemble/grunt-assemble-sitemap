/*
 * Assemble Plugin: Sitemap
 * https://github.com/assemble/assemble-contrib-sitemap
 *
 * Sitemap generator plugin for Assemble.
 *
 * Copyright (c) 2014 Hariadi Hinta, contributors.
 * Licensed under the MIT license.
 */

var xml =  require('jstoxml');
var async = require('async');
var _ = require('lodash');
var path = require('path');

module.exports  = function (params, callback) {

  var assemble  = params.assemble;
  var grunt     = params.grunt;
  var pages     = assemble.options.pages;
  var options   = assemble.options.sitemap || {};
  var sitemap   = [];
  var robots    = [];
  var exclusion = ['404'];
  var pkg       = grunt.file.readJSON('package.json');

  options.homepage = options.homepage || pkg.homepage;
  options.robot = options.robot !== false;
  options.changefreq = options.changefreq || 'weekly';
  options.priority = (options.priority || 0.5).toString();
  options.dest = options.dest || path.dirname(pages[0].dest);


  // Only write if it actually changed.
  var write = function (file, content) {
    var msg;
    var old = grunt.file.exists(file) ? grunt.file.read(file) : '';

    if (old !== content) {
      grunt.file.write(file, content);
      msg = 'Created '.yellow + file.cyan;
    } else {
      msg = 'Keeping '.yellow + file.cyan;
    }
    return grunt.verbose.ok(msg);
  };

  // Return the relative destination if the option is enabled
  var getExternalFilePath = function (relativedest, file) {
    return (relativedest ? file.dest.replace(options.dest + "/", "") : file.dest );
  };

  async.forEach(pages, function (file, next) {

    if (!_.isUndefined(options.exclude)) {
      exclusion = _.union([], exclusion, options.exclude || []);
    }

    var url = options.homepage;
    var date = file.data.updated || file.data.date || new Date();
    var changefreq = file.data.changefreq || options.changefreq;
    var priority = file.data.priority || options.priority;
    var relativedest = options.relativedest;

    if (exclusion.indexOf(file.basename) !== -1 ||
        grunt.file.isMatch({srcBase: options.dest}, exclusion, file.dest)) {
      robots.push('Disallow: /' + getExternalFilePath(relativedest, file));
      return;
    }

    sitemap.push({
      url: {
        loc: url + '/' + getExternalFilePath(relativedest, file),
        lastmod: date.toISOString(),
        changefreq: changefreq,
        priority: priority
      }
    });

    next();
  }, callback());

  var result = xml.toXML({
    _name: 'urlset',
    _attrs: {
      xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
    },
    _content: sitemap
  }, {header: true, indent: '  '});



  var sitemapDest = options.dest + '/sitemap.xml';
  write(sitemapDest, result);

  if (options.robot) {
    var robot = "User-agent: *\n\n";

    robot += robots.join('\n') + '\n';

    var robotpDest = options.dest + '/robots.txt';
    write(robotpDest, robot);
  }

};

module.exports.options = {
  stage: 'render:pre:pages'
};
