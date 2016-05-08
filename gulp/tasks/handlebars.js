var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

// require config
var config = require('../config');

// Compile Handlebars views into HTML views
gulp.task('handlebars', function() {
  return gulp.src([
      config.handlebars.src
    ])
    .pipe($.plumber())
    // .pipe($.compileHandlebars(require(config.handlebars.data), {
    //   batch: config.handlebars.batch,
    //   helpers: require(config.handlebars.helpers),
    // }))
    .pipe($.rename(function(path) {
      path.extname = '.html';
    }))
    .pipe($.size({
      title: 'handlebars'
    }))
    .pipe(gulp.dest(config.handlebars.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
})