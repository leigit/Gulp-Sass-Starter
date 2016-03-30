'use strict';
var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var del         = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var sassdoc     = require('sassdoc');
var sassGlob    = require('gulp-sass-glob');
var postcss     = require('gulp-postcss');
var postcssSVG  = require('postcss-svg');
var gutil       = require('gulp-util');
var a11y        = require('a11y');

var appConfig = {
  src: 'app/',
  dest: 'dist/'
}

/* -------------------------------------- */
// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: appConfig.src
    }
  })
})


/* -------------------------------------- */
// gulp compile sass

gulp.task('sass', function() {
  var postcssProcessors;
postcssSVG = require('postcss-svg');
postcssProcessors = [
  postcssSVG({
    //defaults: '[fill]: black',
    paths: ['./app/images/'],
 })
];
 return gulp.src(appConfig.src + 'sass/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sassGlob())
    .pipe($.plumber()) // keep watching and log errors in the console
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({ // Passes it through a gulp-sass
      /* include sass from the bower_components folder */
      includePaths: ['app/bower_components']
      //errLogToConsole: true
    }))
    .pipe($.autoprefixer({
      browsers: ['last 3 versions', 'ie 9']
    }))
    .pipe(postcss(postcssProcessors))
    .pipe($.cssnano())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(appConfig.src + '/css'))
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
});

gulp.task('sassdoc', function () {
  var options = {
    dest: 'docs',
    verbose: true,
    display: {
      access: ['public', 'private'],
      alias: true,
      watermark: true,
    },
  };
  return gulp.src('app/sass/**/*.scss')
    .pipe(sassdoc(options));
});

/* -------------------------------------- */
// Watch for file changes

gulp.task('watch', function () {
  gulp.watch(appConfig.src + 'sass/**/*.scss', ['sass']);
  gulp.watch(appConfig.src + '*.html', browserSync.reload);
  gulp.watch(appConfig.src + 'js/**/*.js', browserSync.reload);
});


/* -------------------------------------- */
// Optimization Tasks
// Task to minify the js and css assets and move
// them from their dependency folder (eg. bower_components)
// to the dist folder. This also changes their html
// paths to new html paths
// ------------------

// Optimizing CSS and JavaScript
gulp.task('useref', function() {
  return gulp.src(appConfig.src + '*.html')
    .pipe($.useref())
    // Uglifies only if it's a Javascript file
    .pipe($.if('*.js', $.uglify()))
    // Minifies only if it's a CSS file
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.size({
      title: 'useref'
    }))
    .pipe(gulp.dest(appConfig.dest))
});

// Optimizing Images
gulp.task('images', function() {
  return gulp.src(appConfig.src + 'images/*')
  // Caching images that ran through imagemin
    .pipe($.cache($.imagemin({
      interlaced: true,
    })))
    .pipe($.size({
      title: 'images'
    }))
    .pipe(gulp.dest(appConfig.dest + 'images'));
})


// Copying fonts to dist
gulp.task('fonts', function() {
  return gulp.src(appConfig.src + 'fonts/**/*')
  .pipe(gulp.dest(appConfig.dest + 'fonts'))
})

// Cleaning up
gulp.task('clean', function(callback) {
  del('dist');
  return cache.clearAll(callback);
})

gulp.task('clean:dist', function(callback) {
  del(['dist/**/*', '!dist/images', '!dist/images/**/*'], callback);

});

// Build Sequences
// ---------------

// gulp - dev server + watch
gulp.task('default', function(callback) {
  runSequence(['sass'], 'browserSync', 'watch', callback);
});

// gulp build - Build for production
gulp.task('build', function(callback) {
  runSequence('clean:dist', ['sass', 'useref', 'images', 'fonts', 'sassdoc'], callback)
});


/* -------------------------------------- */
// Accessibility Task
// https://github.com/addyosmani/a11y

gulp.task('a11y', function() {
  a11y('http://google.com', function(err, reports) {
    if (err) {
      gutil.log(gutil.colors.red('gulp a11y error: ' + err));
      return;
    }
    reports.audit.forEach(function(report) {
      if (report.result === 'FAIL') {
        gutil.log(displaySeverity(report), gutil.colors.red(report.heading), report.elements);
      }
    });
  });
});

function displaySeverity(report) {
  if (report.severity == 'Severe') {
    return gutil.colors.red('[' + report.severity + '] ');
  } else if (report.severity == 'Warning') {
    return gutil.colors.yellow('[' + report.severity + '] ');
  } else {
    return '[' + report.severity + '] ';
  }
}
