"use strict";

var assign = require('object-assign');
var plumber = require('gulp-plumber');
var mocha = require('gulp-mocha');

function MochaTask(params) {
  this.params = (params || {});

  if (this.params.coffee) {
    require('coffee-script/register');
  }
}

MochaTask.getDefaults = function() {
  return {
    search: ['./src/**/*.js', './tests/**/*.js', './tests/**/*.coffee'],
    coffee: false,
    use: ['should']
  };
};

MochaTask.prototype.enqueue = function(gulp, params) {
  var defaults = Object.keys(MochaTask.getDefaults())
    .concat(['taskName']);

  var opts = Object.keys(params)
    .filter(function (param) {
      defaults.indexOf(param) === -1;
    })
    .reduce(function (memo, param) {
      memo[param] = params[param];
      return memo;
    }, {});

  if (getType(params.use) === 'array') {
    opts.globals = params.use.reduce(function (memo, plugin) {
      memo[plugin] = require(plugin);
      return memo;
    }, {});
  }

  return gulp.src(params.search, {read: false})
    .pipe(plumber())
    .pipe(mocha(opts));
};

MochaTask.prototype.generateWatcher = function() {
  return true;
};

function getType(obj) {
  return Object.prototype.toString.call(obj)
    .match(/^\[object (.+)\]$/i)[1]
    .toLowerCase();
}


module.exports = MochaTask;

