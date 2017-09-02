const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const plumber = require('gulp-plumber');

const path = {
  src: './src',
  srcJs: './src/**/*.js',
  dist: './dist',
};

gulp.task('lint', () => gulp.src(path.srcJs)
  .pipe(plumber())
  .pipe(eslint({ fix: true }))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));


gulp.task('build', () => gulp.src(path.srcJs)
  .pipe(plumber())
  .pipe(babel())
  .pipe(gulp.dest('dist')));

gulp.task('default', ['build', 'lint'], () => {
  gulp.watch(path.srcJs, ['lint', 'build']);
});
