---
username: hariadi
---
# {%= name %} [![NPM version](https://badge.fury.io/js/{%= name %}.png)](http://badge.fury.io/js/{%= name %}) {% if (travis) { %} [![Build Status]({%= travis %}.png)]({%= travis %}){% } %}

> {%= description %}

## Table of Contents
{%= toc %}

## Quickstart
{%= _.doc("quickstart.md") %}

## Options
{%= _.doc("options.md") %}

## Usage Examples
{%= _.doc("examples.md") %}

## Contributing
We welcome all kinds of contributions! The most basic way to show your support is to star the project, and if you'd like to get involed please see the [Contributing to {%= name %}](http://assemble.io/contributing/) guide for information on contributing to this project.

## Author

**Hariadi Hinta**

+ [github.com/{%= username %}](https://github.com/{%= username %})
+ [twitter.com/{%= username %}](http://twitter.com/{%= username %})

## Release History
{% if (changelog) {
  _.each(changelog, function(details, version) {
    var date = details.date;
    if (date instanceof Date) {
      date = grunt.template.date(new Date(date.getTime() + date.getTimezoneOffset() * 60000), 'yyyy-mm-dd');
    }
    print('\n * ' + [
      date,
      version,
      details.changes.join(' '),
    ].join('\u2003\u2003\u2003'));
  });
} else { %}
_(Nothing yet)_
{% } %}

## License
{%= copyright %}
{%= license %}

***

_This file was generated on {%= grunt.template.date("fullDate") %}._