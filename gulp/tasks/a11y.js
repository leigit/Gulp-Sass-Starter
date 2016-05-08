var gulp = require('gulp');
var gutil = require('gulp-util');
var a11y = require('a11y');

// Accessibility Task
// to use, install to the project:
// ~$ npm install --save-dev a11y
// https://github.com/addyosmani/a11y

gulp.task('a11y', function() {
  a11y('localhost:3000/', function(err, reports) {
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
