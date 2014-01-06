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

module.exports = function (params, callback) {
  
  var grunt = params.grunt;
  var _ = grunt.util._;
  var context = params.context;
  var pages = context.pages; 
  var page = context.page;
  var sitemaps = context.sitemap || {};
  var sitemap = [];
  var robots = [];
  var exclusion = ['404'];
  var pkg = grunt.file.readJSON('package.json');

  sitemaps.homepage = sitemaps.homepage || pkg.homepage;
  sitemaps.robot = sitemaps.robot || true;
  sitemaps.changefreq = sitemaps.changefreq || 'weekly';
  sitemaps.priority = (sitemaps.priority || 0.5).toString();
  sitemaps.relativedest = sitemaps.relativedest || false;


  // Only write if it actually changed.
  var write = function(file, content) {
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

  async.forEach(pages, function (file, next) {

    if(!_.isUndefined(sitemaps.exclude)) {
      exclusion = _.union([], exclusion, sitemaps.exclude || []);
    }

    var url = sitemaps.homepage;
    var date = file.data.updated || file.data.date || new Date();
    var changefreq = sitemaps.changefreq;
    var priority = sitemaps.priority;
    var relativedest = sitemaps.relativedest;
    
    if(exclusion.indexOf(file.basename) !== -1) {
      robots.push('Disallow: /' + file.dest);
      return;
    }

    sitemap.push({
      url: {
        loc: url + '/' + (relativedest ? file.dest.replace(file.filePair.orig.dest+"/","") : file.dest ),
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

  var dest = page.filePair.orig.dest;

  var sitemapDest = dest + '/sitemap.xml';
  write(sitemapDest, result);

  if (sitemaps.robot) {
    var robot = "User-agent: *\n\n";

    _.forEach(robots, function(item) {
      robot += item + '\n';
    });

    var robotpDest = dest + '/robots.txt';
    write(robotpDest, robot);
  }
  
};