# assemble-contrib-sitemap [![NPM version](https://badge.fury.io/js/assemble-contrib-sitemap.png)](http://badge.fury.io/js/assemble-contrib-sitemap)   [![Build Status](https://travis-ci.org/assemble/assemble-contrib-sitemap.png)](https://travis-ci.org/assemble/assemble-contrib-sitemap) 

> Sitemap generator plugin for Assemble

## Table of Contents
function (src, options) {

    /**
     * Custom TOC template for marked-toc
     * @type  {String}
     */

    var tmpl = '<%= depth %><%= bullet %>[<%= heading %>](<%= url %>)\n';
    var headingTmpl = '## [<%= heading %>](<%= link %>)<%= nl %>';
    var renderedTOC = '';

    /**
     * If source file patterns are provided, then read in the array
     * of files and generate a single Table of Contents for all files
     * in the array. Also, extend the object returned by marked-toc
     * with additional properties for each file
     */

    if(src) {

      // Extend TOC options with verb options
      var opts = _.extend({}, verb.options, options);

      var tocOpts = _.extend({}, {
        firsth1: true,
        template: tmpl,
        headings: headingTmpl
      }, opts.tocOpts);

      // Extend toc options with options defined on the context.
      _.extend(tocOpts, verb.context.tocOpts);

      /**
       * Generate the multi-file TOC
       * @param {String} filepath
       * @return {String} Table of Contents
       */

      renderedTOC = file.expand(src, opts.glob).map(function(filepath) {
        var dest = verb.cwd(opts.dest || opts.destBase || '');

        // Build a relative link to each file
        var link = relative(dest || verb.cwd(), filepath);

        // Get a 'pretty' name for each file for use in the TOC
        var name = file.name(filepath);

        // Remove "docs-" and other junk from headings
        var safe = _.safename(name, {omit: 'docs', stripPrefix: false});

        // Exclude front matter
        var content = file.readFileSync(filepath);
        var page = verb.matter(content);

        // Actually create the TOC. `toc.raw` returns an object instead
        // of a string, so that we can extend it.
        var md = toc.raw(page.content, tocOpts);

        // Extend the object returned by marked-toc with relative
        // links and section links, so we can generate the TOC
        // from our custom template.
        var output = md.data.map(function (obj) {
          obj = _.extend(obj, {
            url: link + '/#' + obj.url
          });
          return template(tocOpts.template, obj);
        }).join('');

        // Reconstruct the "section" headings using sanitized
        // versions of the filenames.
        var heading = _.str.titleize(safe);
        var section = template(tocOpts.headings, {
          heading: heading,
          link: link,
          nl: '\n\n'
        });

        // Render our new TOC
        return section + output;
      }).join(opts.sep);
    } else {


      /**
       * If no src patterns are passed in, just render the TOC from
       * the content of the current page.
       */

      renderedTOC = toc(verb.page.content);
    }

    return renderedTOC;
  }

## Quickstart

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin with the following command:

```bash
npm install assemble-contrib-sitemap --save
```

Once that's done, just add `assemble-contrib-sitemap`, the name of this module, to the `plugins` option in the Assemble task:

```js
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    assemble: {
      options: {
        plugins: ['assemble-contrib-sitemap']
      },
      ...
    }
  });
  grunt.loadNpmTasks('assemble');
  grunt.registerTask('default', ['assemble']);
};
```

If everything was installed and configured correctly, you should be ready to go!

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html

## Options
See [sitemaps.org](http://www.sitemaps.org/protocol.html#xmlTagDefinitions) for detail XML tag definitions.

#### dest
Type: `String`  
Default: `undefined`

Sitemap destination. If not set, fallback to assemble destination.

### homepage
Type: `String`  
Default: `homepage` (from package.json)

Site URL

### changefreq
Type: `String`  
Default: `weekly`

How frequently the page is likely to change. This value provides general information to search engines and may not correlate exactly to how often they crawl the page. Valid values are:

 - always
 - hourly
 - daily
 - weekly
 - monthly
 - yearly
 - never

### priority
Type: `Float`  
Default: `0.5`

The priority of this URL relative to other URLs on your site. Valid values range from 0.0 to 1.0. This value does not affect how your pages are compared to pages on other sites—it only lets the search engines know which pages you deem most important for the crawlers.

### exclusions
Type: `Array`  
Default: `['404']`

Page to omit from the sitemap.

```js
options: {
  sitemap: {
    exclusions: ["foo", "bar"],
  },
  files: {
    ...
  }
}
```

#### robot
Type: `Boolean`  
Default: `true`

Generate robots.txt from `exclusions` list.


## Usage Examples
### Simple

To simplify might do something like:

```js
assemble: {
  blog: {
    options: {
      plugins: ['assemble-contrib-sitemap'],
    },
    files: {
      './blog/': ['./templates/blog/*.hbs']
    }
  }
}

```

### Result

```js
./blog/sitemap.xml
./blog/robots.txt
```

### Advanced

```js
assemble: {
  blog: {
    options: {
      plugins: ['assemble-contrib-sitemap'],
      sitemap: {
        homepage: 'http://assemble.io',
            changefreq: 'daily',
            priority: '0.8',
            exclude: ['50x', 'foo'],
            robot: false
      }
    },
    files: {
      './blog/': ['./templates/blog/*.hbs']
    }
  }
}
```

### Result

```js
./blog/sitemap.xml
```


## Contributing
We welcome all kinds of contributions! The most basic way to show your support is to star the project, and if you'd like to get involed please see the [Contributing to assemble-contrib-sitemap](http://assemble.io/contributing/) guide for information on contributing to this project.

## Author

**Hariadi Hinta**

+ [github.com/hariadi](https://github.com/hariadi)
+ [twitter.com/hariadi](http://twitter.com/hariadi)

## License
Copyright (c) 2014 Hariadi Hinta, contributors.  


**DATE**       **VERSION**   **CHANGES**                                                             
* 2014-02-21   v0.2.1        fix option.robot was ignored and always true 0159123,[object            
                             Object],[object Object],[object Object],cosmetical changes (code        
                             formatting, naming, simplify),[object Object]                           
* 2014-02-05   v0.2.0        Generation of robots.txt will now respect the relativedest option.      
* 2014-02-02   v0.1.9        Fix sitemap destination                                                 
* 2014-01-28   v0.1.8        Use external library,Get pages from assemble object                     
* 2014-01-03   v0.1.7        Add relativedest option                                                 
* 2013-12-12   v0.1.6        Fix plugin name in Usage Examples,Update deps                           
* 2013-11-28   v0.1.4        Updates dependencies to work with Grunt 0.4.2,[object Object],Add TOC to
                             docs                                                                    
* 2013-10-20   v0.1.3        Fix sitemap and robots.txt generated on every folder,Update docs        
                             options:exclusions                                                      
* 2013-10-18   v0.1.2        Fix homepage                                                            
* 2013-10-17   v0.1.1        Add option to generate robots.txt,Change name to                        
                             assemble-contrib.sitemap,Move to Assemble main repo                     
* 2013-10-01   v0.1.0        First commmit.,Add option to exclude                                    

***

_This file was generated by [grunt-verb](https://github.com/assemble/grunt-verb) on May 01, 2014._
