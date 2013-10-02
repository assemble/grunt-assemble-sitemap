module.exports = function (params, callback) {
  var pages = params.context.pages, 
      sitemap = [], 
      file = params.grunt.file;

  pages.forEach(function(page) {
    sitemap.push({
      url: {
        loc: page.date,
        lastmod: page.updated.toDate().toISOString() || page.date.toDate().toISOString()
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

  file.write(page.dest, result);

  callback();
};