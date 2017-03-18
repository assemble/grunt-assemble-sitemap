'use strict';

var fs = require('fs');
var path = require('path');
var dateformat = require('dateformat');
var repeat = require('repeat-string');
var yaml = require('js-yaml');
var exists = require('fs-exists-sync');
var isValid = require('is-valid-app');

module.exports = function(app, base, env) {
  if (!isValid(app, 'grunt-assemble-sitemap-verbfile')) return;
  app.use(require('verb-generate-readme'));
  app.on('error', console.log);
  /**
   * Tasks
   */

  app.task('changelog', function(cb) {
    var fp = path.join(__dirname, 'CHANGELOG');
    if (!exists(fp)) return cb();
    var changelog = yaml.safeLoad(fs.readFileSync(fp, 'utf8'));
    var keys = Object.keys(changelog);

    function mapKeys(arr) {
      return arr.map(function(key) {
        return `${dateformat(changelog[key].date, 'isoDate')}      **${key}**\n${mapChanges(changelog[key].changes)}`;
      }).join('\n\n');
    }

    function mapChanges(changes) {
      return changes.map(function(change, i) {
        return `- ${change}`;
      }).join('\n ');
    }

    var tmpl = `${mapKeys(keys)}`;
    app.include('history.md', tmpl);
    cb();
  });

  app.task('default', function(cb) {
    app.generate(['changelog', 'readme'], cb);
  });
};

