# grunt-assemble-sitemap [![NPM version](https://img.shields.io/npm/v/grunt-assemble-sitemap.svg?style=flat)](https://www.npmjs.com/package/grunt-assemble-sitemap) [![NPM monthly downloads](https://img.shields.io/npm/dm/grunt-assemble-sitemap.svg?style=flat)](https://npmjs.org/package/grunt-assemble-sitemap)  [![NPM total downloads](https://img.shields.io/npm/dt/grunt-assemble-sitemap.svg?style=flat)](https://npmjs.org/package/grunt-assemble-sitemap) [![Linux Build Status](https://img.shields.io/travis/assemble/grunt-assemble-sitemap.svg?style=flat&label=Travis)](https://travis-ci.org/assemble/grunt-assemble-sitemap) [![Windows Build Status](https://img.shields.io/appveyor/ci/assemble/grunt-assemble-sitemap.svg?style=flat&label=AppVeyor)](https://ci.appveyor.com/project/assemble/grunt-assemble-sitemap)

> Sitemap plugin for Assemble

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Options](#options)
- [Examples](#examples)
- [About](#about)

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save grunt-assemble-sitemap
```

## Usage

Register the plugin in your assemble config:

```js
assemble: {
  options: {
    plugins: ['grunt-assemble-sitemap', 'other/plugins/*']
  }
}
```

Visit the [plugins docs](http://assemble.io/plugins/) for more info or for help getting started.

## Options

See [sitemaps.org](http://www.sitemaps.org/protocol.html#xmlTagDefinitions) for detail XML tag definitions.

## dest

Type: `String`  

Default: `undefined`

Sitemap destination. If not set, fallback to assemble destination.

## homepage

Type: `String`  

Default: `homepage` (from package.json)

Site URL

## changefreq

Type: `String`  

Default: `weekly`

How frequently the page is likely to change. This value provides general information to search engines and may not correlate exactly to how often they crawl the page. Valid values are:

* always
* hourly
* daily
* weekly
* monthly
* yearly
* never

## priority

Type: `Float`  

Default: `0.5`

The priority of this URL relative to other URLs on your site. Valid values range from 0.0 to 1.0. This value does not affect how your pages are compared to pages on other sites—it only lets the search engines know which pages you deem most important for the crawlers.

## exclude

Type: `Array`  

Default: `['404']`

Pages to omit from the sitemap.

```js
options: {
  sitemap: {
    exclude: ["foo", "bar"],
  },
  files: {
    ...
  }
}
```

## relativedest

Type: `String` / `Boolean`  

Default: `false`

Path to which the URLs in Sitemap and Robots should be relative to. `true` is equal to the destination path `dest` and `false` is equal to the root directory.

## basename

Type: `String`
Default: `sitemap.xml`

If you have a master sitemap that references sub-sitemaps, use this feature. For example `static-sitemap.xml`

## robot

Type: `Boolean`  

Default: `true`

Generate robots.txt from `exclusions` list.

## pretty

Type: `Boolean`
Default: `false`

When generating a sitemap with directory indexes, use pretty urls by removing `index` path segments from `http://www.example.com/directory/index.html` to to create `http://www.example.com/directory/`

## Simple

To simplify might do something like:

```js
assemble: {
  blog: {
    options: {
      plugins: ['grunt-assemble-sitemap'],
    },
    files: {
      './blog/': ['./templates/blog/*.hbs']
    }
  }
}

```

## Result

```js
./blog/sitemap.xml
./blog/robots.txt
```

## Advanced

```js
assemble: {
  blog: {
    options: {
      plugins: ['grunt-assemble-sitemap'],
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

## Result

```js
./blog/sitemap.xml
```

## About

### Related projects

* [grunt-assemble-anchors](https://www.npmjs.com/package/grunt-assemble-anchors): Assemble plugin for creating anchor tags from headings in generated html using Cheerio.js. | [homepage](https://github.com/assemble/grunt-assemble-anchors#readme "Assemble plugin for creating anchor tags from headings in generated html using Cheerio.js.")
* [grunt-assemble-contextual](https://www.npmjs.com/package/grunt-assemble-contextual): Generates a JSON file with the context of each page. Basic plugin to help see… [more](https://github.com/assemble/grunt-assemble-contextual) | [homepage](https://github.com/assemble/grunt-assemble-contextual "Generates a JSON file with the context of each page. Basic plugin to help see what's happening in the build.")
* [grunt-assemble-decompress](https://www.npmjs.com/package/grunt-assemble-decompress): Assemble plugin for extracting zip, tar and tar.gz archives. | [homepage](https://github.com/assemble/grunt-assemble-decompress "Assemble plugin for extracting zip, tar and tar.gz archives.")
* [grunt-assemble-download](https://www.npmjs.com/package/grunt-assemble-download): Assemble plugin for downloading files from GitHub. | [homepage](https://github.com/assemble/grunt-assemble-download "Assemble plugin for downloading files from GitHub.")
* [grunt-assemble-i18n](https://www.npmjs.com/package/grunt-assemble-i18n): Plugin for adding i18n support to Assemble projects. | [homepage](https://github.com/assemble/grunt-assemble-i18n "Plugin for adding i18n support to Assemble projects.")
* [grunt-assemble-lunr](https://www.npmjs.com/package/grunt-assemble-lunr): Assemble plugin for adding search capabilities to your static site, with lunr.js. | [homepage](http://assemble.io "Assemble plugin for adding search capabilities to your static site, with lunr.js.")
* [grunt-assemble-navigation](https://www.npmjs.com/package/grunt-assemble-navigation): Assemble navigation plugin. Automatically generate Bootstrap-style, multi-level side nav. See the sidenav on assemble.io for… [more](https://github.com/assemble/grunt-assemble-navigation) | [homepage](https://github.com/assemble/grunt-assemble-navigation "Assemble navigation plugin. Automatically generate Bootstrap-style, multi-level side nav. See the sidenav on assemble.io for a demonstration.")
* [grunt-assemble-permalinks](https://www.npmjs.com/package/grunt-assemble-permalinks): Permalinks plugin for Assemble, the static site generator for Grunt.js, Yeoman and Node.js. This plugin… [more](https://github.com/assemble/grunt-assemble-permalinks) | [homepage](https://github.com/assemble/grunt-assemble-permalinks "Permalinks plugin for Assemble, the static site generator for Grunt.js, Yeoman and Node.js. This plugin enables powerful and configurable URI patterns, [Moment.js](http://momentjs.com/) for parsing dates, much more.")
* [grunt-assemble-sitemap](https://www.npmjs.com/package/grunt-assemble-sitemap): Sitemap plugin for Assemble | [homepage](http://assemble.io/plugins "Sitemap plugin for Assemble")
* [grunt-assemble-toc](https://www.npmjs.com/package/grunt-assemble-toc): Assemble middleware for adding a Table of Contents (TOC) to any HTML page. | [homepage](http://assemble.io "Assemble middleware for adding a Table of Contents (TOC) to any HTML page.")
* [grunt-assemble-wordcount](https://www.npmjs.com/package/grunt-assemble-wordcount): Assemble plugin for displaying wordcount and average reading time to blog posts or pages. | [homepage](https://github.com/assemble/grunt-assemble-wordcount "Assemble plugin for displaying wordcount and average reading time to blog posts or pages.")
* [grunt-assemble](https://www.npmjs.com/package/grunt-assemble): Static site generator for Grunt.js, Yeoman and Node.js. Used by Zurb Foundation, Zurb Ink, H5BP/Effeckt… [more](http://assemble.io) | [homepage](http://assemble.io "Static site generator for Grunt.js, Yeoman and Node.js. Used by Zurb Foundation, Zurb Ink, H5BP/Effeckt, Less.js / lesscss.org, Topcoat, Web Experience Toolkit, and hundreds of other projects to build sites, themes, components, documentation, blogs and gh")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Contributors

| **Commits** | **Contributor** | 
| --- | --- |
| 64 | [hariadi](https://github.com/hariadi) |
| 11 | [doowb](https://github.com/doowb) |
| 7 | [rauberdaniel](https://github.com/rauberdaniel) |
| 7 | [hgoebl](https://github.com/hgoebl) |
| 2 | [jonschlinkert](https://github.com/jonschlinkert) |
| 1 | [quartzmo](https://github.com/quartzmo) |
| 1 | [jarrodconnolly](https://github.com/jarrodconnolly) |
| 1 | [Melindrea](https://github.com/Melindrea) |
| 1 | [olegsmetanin](https://github.com/olegsmetanin) |

### Release history

2017-03-16      **v0.2.6**

* Add `option.basename` to specify the basename of the output file. Defaults to `sitemap.xml`.
* Add `option.pretty` to remove `index.html` from paths.
* Repo code clean up.

2014-05-31      **v0.2.5**

* fix sitemap and robots not generated
* relativedest can be a path now

2014-05-31      **v0.2.4**

* added sitemap URL to robots.txt
* added relativedest to options

2014-05-02      **v0.2.3**

* fixes toc
* Change docs to use verb

2014-03-25      **v0.2.2**

* Change from plugin to middleware

2014-02-20      **v0.2.1**

* fix option.robot was ignored and always true  0159123
* (feat) add option.dest and use as output path
* fix option.robot was ignored and always true
* (feat) add option to overwrite changefreq per file
* cosmetical changes (code formatting, naming, simplify)
* (wip) enable globbing patterns for option.exclude

2014-02-04      **v0.2.0**

* Generation of robots.txt will now respect the relativedest option.

2014-02-01      **v0.1.9**

* Fix sitemap destination

2014-01-27      **v0.1.8**

* Use external library
* Get pages from assemble object

2014-01-02      **v0.1.7**

* Add relativedest option

2013-12-11      **v0.1.6**

* Fix plugin name in Usage Examples
* Update deps

2013-11-27      **v0.1.4**

* Updates dependencies to work with Grunt 0.4.2
* [object Object]
* Add TOC to docs

2013-10-19      **v0.1.3**

* Fix sitemap and robots.txt generated on every folder
* Update docs options:exclusions

2013-10-17      **v0.1.2**

* Fix homepage

2013-10-16      **v0.1.1**

* Add option to generate robots.txt
* Change name to assemble-contrib.sitemap
* Move to Assemble main repo

2013-09-30      **v0.1.0**

* First commmit.
* Add option to exclude

### Building docs

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

### Author

**Hariadi Hinta**

* [github/hariadi](https://github.com/hariadi)
* [twitter/hariadi](https://twitter.com/hariadi)

### License

Copyright © 2017, [Hariadi Hinta](https://github.com/hariadi).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.4.3, on March 17, 2017._