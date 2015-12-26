'use strict';
var gulp = require('gulp');
// Rather than have to specify each gulp plugin, gulp-load-plugins will search your packages.json file and automatically include them
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var sassdoc = require('sassdoc');


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
 return gulp.src(appConfig.src + 'scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe($.plumber()) // keep watching and log errors in the console
    //.pipe(sassdoc())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({ // Passes it through a gulp-sass
      /* include sass from the bower_components folder */
      includePaths: ['app/bower_components']
      //errLogToConsole: true
    }))
    .pipe($.autoprefixer({
      browsers: ['last 3 versions', 'ie 9']
    }))
    .pipe($.sourcemaps.write())

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
    groups: {
      'undefined': 'Ungrouped',
      foo: 'Foo group',
      bar: 'Bar group',
    },
    basePath: 'https://github.com/SassDoc/sassdoc',
  };

  return gulp.src('app/scss/**/*.scss')
    .pipe(sassdoc(options));
});

/* -------------------------------------- */
// Watch for file changes

gulp.task('watch', function () {
  gulp.watch(appConfig.src + 'scss/**/*.scss', ['sass']);
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
  var assets = $.useref.assets();
  return gulp.src(appConfig.src + '*.html')
    .pipe(assets)
    // Uglifies only if it's a Javascript file
    .pipe($.if('*.js', $.uglify()))
    // Minifies only if it's a CSS file
    .pipe($.sourcemaps.init())
      .pipe($.if('*.css', $.cssnano()))
    //.pipe($.if('*.css', $.minifyCss())) TODO for removal
    .pipe($.sourcemaps.write('.'))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.size({
      title: 'useref'
    }))
    .pipe(gulp.dest(appConfig.dest))
});

// Optimizing Images
gulp.task('images', function() {
  return gulp.src(appConfig.src + 'images/**/*.+(png|jpg|jpeg|gif|svg)')
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
  // return del(['dist/**/*', '!dist/images', '!dist/images/**/*'], callback);
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
