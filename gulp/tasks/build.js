var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function(callback) {
  runSequence(
    ['clean:dev', 'clean:dist'],
    ['sass', 'handlebars'],
    ['useref', 'images', 'fonts'],
    callback
  );
})
