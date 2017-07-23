const gulp = require("gulp");
const babel = require("gulp-babel");

const path = {
    src: "./src",
    srcJs: "./src/**/*.js",
    dist: "./dist"
}

gulp.task("build", function () {
    return gulp.src(path.srcJs)
        .pipe(babel())
        .pipe(gulp.dest("dist"));
});


gulp.task("default", ['build'],function () {
    gulp.watch(path.srcJs, ['build']);
});