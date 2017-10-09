const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const prettier = require('gulp-prettier');

const path = {
  src: './src',
  srcJs: './src/**/*.js',
  dist: './dist',
};


gulp.task('pretty', () => gulp.src(path.srcJs)
  .pipe(plumber())
  .pipe(prettier())
  .pipe(gulp.dest('dist')));

gulp.task('lint', () => gulp.src(path.srcJs)
  .pipe(plumber())
  .pipe(eslint({ fix: true }))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));


gulp.task('build', () => gulp.src(path.srcJs)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist')));

gulp.task('default', ['pretty', 'build', 'lint'], () => {
  gulp.watch(path.srcJs, ['pretty', 'lint', 'build']);
});
