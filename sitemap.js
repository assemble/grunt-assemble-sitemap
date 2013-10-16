/*
 * Assemble Plugin: Sitemap
 * https://github.com/hariadi/assemble-sitemap
 *
 * Sitemap generator plugin for Assemble.
 *
 * Copyright (c) 2013 Hariadi Hinta, contributors.
 * Licensed under the MIT license.
 */

var xml =  require('jstoxml');

module.exports = function (params, callback) {
  
  var grunt = params.grunt;
  var _ = grunt.util._;
  var context = params.context;
  var pages = context.pages; 
  var page = context.page;
  var sitemaps = context.sitemap;
  var sitemap = [];
  var exclusion = ['404'];

  if(_.isUndefined(sitemaps)) {
    sitemaps = {
      homepage: grunt.config.get('pkg.homepage')
    }; 
  }

  pages.forEach(function(page) {

    if(!_.isUndefined(sitemaps.exclude)) {
      exclusion = exclusion.concat(sitemaps.exclude);
    }

    var url = sitemaps.homepage;
    var date = page.data.updated || page.data.date || new Date();
    var changefreq = sitemaps.changefreq || 'weekly';
    var priority = (sitemaps.priority || 0.5).toString();
    
    if(exclusion.indexOf(page.basename) === 0) {
      return;
    }

    sitemap.push({
      url: {
        loc: url + '/' + page.dest,
        lastmod: date.toISOString(),
        changefreq: changefreq,
        priority: priority
      }
    });
  });

  var result = xml.toXML({
    _name: 'urlset',
    _attrs: {
      xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
    },
    _content: sitemap
  }, {header: true, indent: '  '});

  grunt.file.write(page.dirname + '/sitemap.xml', result);
  grunt.verbose.writeln('>> Sitemap:'.yellow, page.dirname + '/sitemap.xml');

  callback();
};