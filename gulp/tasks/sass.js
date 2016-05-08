// require modules
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sassGlob    = require('gulp-sass-glob');
var browserSync = require('browser-sync');

// require config
var config = require('../config');

// gulp compile sass to CSS
gulp.task('sass', function() {
 return gulp.src(config.sass.src)
    .pipe(sassGlob())
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({ //
      includePaths: ['app/bower_components'
      ,
      'node_modules']
    }))
    .pipe($.autoprefixer({
      browsers: ['last 3 versions', 'ie 9']
    }))
    .pipe($.cssnano())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});