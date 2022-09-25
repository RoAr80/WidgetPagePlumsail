const gulp = require('gulp');
const inlinesource = require('gulp-inline-source');
const replace = require('gulp-replace');
const hash = require('gulp-hash-filename');

gulp.task('default', () => {
  return gulp
    .src('./build/*.html')
    .pipe(replace('.js"></script>', '.js" inline></script>'))
    .pipe(replace('rel="stylesheet">', 'rel="stylesheet" inline>'))
    .pipe(
      inlinesource({
        compress: false,
        ignore: ['png', 'svg'],
      })
    )
    .pipe(hash())
    .pipe(gulp.dest('./build'));
});