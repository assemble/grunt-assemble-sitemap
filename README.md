# assemble-contrib-sitemap [![NPM version](https://badge.fury.io/js/assemble-contrib-sitemap.png)](http://badge.fury.io/js/assemble-contrib-sitemap)  [![Build Status](https://travis-ci.org/assemble/assemble-contrib-sitemap.png)](https://travis-ci.org/assemble/assemble-contrib-sitemap)

> Sitemap generator plugin for Assemble

## Table of Contents
* [Quickstart](#quickstart)
* [Options](#options)
* [Usage Examples](#usage-examples)
* [Contributing](#contributing)
* [Author](#author)
* [License](#license)


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
Released under the  license

***

_This file was generated on Tuesday, March 25, 2014._