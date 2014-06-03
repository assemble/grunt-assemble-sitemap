# assemble-middleware-sitemap [![NPM version](https://badge.fury.io/js/assemble-middleware-sitemap.png)](http://badge.fury.io/js/assemble-middleware-sitemap)   [![Build Status](https://travis-ci.org/assemble/assemble-middleware-sitemap.png)](https://travis-ci.org/assemble/assemble-middleware-sitemap) 

> Sitemap middleware for Assemble

## Table of Contents
* [Install](#install)
* [Options](#options)
* [Usage Examples](#usage-examples)
* [Contributing](#contributing)
* [Changes](#changes)
* [Author](#author)
* [License](#license)
* [Related projects](#related-projects)


## Install
Install with [npm](npmjs.org):

```bash
npm i assemble-middleware-sitemap --save-dev
```

Next, register the middleware with Assemble:

```js
assemble: {
  options: {
    middleware: ['assemble-middleware-sitemap', 'other/middleware/*']
  }
}
```

Visit the [middleware docs](http://assemble.io/middleware/) for more info or for help getting started.

## Options
See [sitemaps.org](http://www.sitemaps.org/protocol.html#xmlTagDefinitions) for detail XML tag definitions.

### dest
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

Pages to omit from the sitemap.

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

### relativedest
Type: `Boolean`  
Default: `false`

If set to `true`, the destination path `dest` won’t be included in the URLs in the sitemap and robots.txt.

### robot
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
      plugins: ['assemble-middleware-sitemap'],
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
      plugins: ['assemble-middleware-sitemap'],
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
We welcome all kinds of contributions! The most basic way to show your support is to star the project, and if you'd like to get involved please see the [Contributing to assemble-middleware-sitemap](http://assemble.io/contributing/) guide for information on contributing to this project.

## Changes
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

## Author

**Hariadi Hinta**

+ [github.com/hariadi](https://github.com/hariadi)
+ [twitter.com/hariadi](http://twitter.com/hariadi)

## License
Copyright (c) 2014 Hariadi Hinta, contributors.  
Released under the MIT license

***

## Related projects
Here are some related projects you might be interested in from the [Assemble](http://assemble.io) core team.

+ [assemble-middleware-anchors](https://github.com/assemble/assemble-middleware-anchors): Assemble middleware for creating anchor tags from generated html. 
+ [assemble-middleware-contextual](https://github.com/assemble/assemble-middleware-contextual): Assemble middleware for generating a JSON file containing the context of each page. Basic middleware to help see what's happening in the build. 
+ [assemble-middleware-decompress](https://github.com/assemble/assemble-middleware-decompress): Assemble plugin for extracting zip, tar and tar.gz archives.  
+ [assemble-middleware-download](https://github.com/assemble/assemble-middleware-download): Assemble middleware for downloading files from GitHub. 
+ [assemble-middleware-i18n](https://github.com/assemble/assemble-middleware-i18n): Assemble middleware for adding i18n support to projects. 
+ [assemble-middleware-lunr](https://github.com/assemble/assemble-middleware-lunr): Assemble middleware for creating a search engine within your static site using lunr.js. 
+ [assemble-middleware-permalinks](https://github.com/assemble/assemble-middleware-permalinks): Permalinks middleware for Assemble, the static site generator for Grunt.js and Yeoman. This plugin enables powerful and configurable URI replacement patterns, presets, uses Moment.js for parsing dates, and much more. 
+ [assemble-middleware-rss](https://github.com/assemble/assemble-middleware-rss): Assemble middleware for creating RSS feeds with Assemble. (NOT published yet!) 
+ [assemble-middleware-toc](https://github.com/assemble/assemble-middleware-toc): Assemble middleware for creating a table of contents in the generated HTML, using Cheerio.js 
+ [assemble-middleware-wordcount](https://github.com/assemble/assemble-middleware-wordcount): Assemble middleware for displaying a word-count, and estimated reading time on blog posts or pages.  

Visit [assemble.io/assemble-middleware](http:/assemble.io/assemble-middleware/) for more information about [Assemble](http:/assemble.io/) middleware.


***

_This file was generated by [grunt-verb](https://github.com/assemble/grunt-verb) on June 03, 2014._