var gulp = require('gulp');
var sassdoc     = require('sassdoc');

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