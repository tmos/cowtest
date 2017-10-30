const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');

const path = {
  src: 'src',
  srcJs: 'src/**/*.js',
  srcHtml: 'src/**/*.html',
  dist: 'dist',
};

gulp.task('lint', () => gulp.src(path.srcJs)
  .pipe(plumber())
  .pipe(eslint({ fix: true }))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));

gulp.task('htmlSources', () => gulp.src(path.srcHtml)
  .pipe(gulp.dest(path.dist)));

gulp.task('build', () => gulp.src(path.srcJs)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(path.dist)));

gulp.task('default', ['build', 'lint', 'htmlSources'], () => {
  gulp.watch(path.srcJs, ['lint', 'build']);
  gulp.watch(path.srcHtml, ['htmlSources']);
});
