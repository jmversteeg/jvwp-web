'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function () {
    return gulp.src('./assets/styles/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./build'));
});

gulp.task('scripts', function () {
    return gulp.src('./assets/scripts/main.js')
        .pipe(gulp.dest('./build'));
});

gulp.task('watch', function () {
    gulp.watch('./assets/styles/**/*.scss', ['styles']);
    gulp.watch('./assets/scripts/**/*.js', ['scripts']);
});

gulp.task('default', [
    'styles',
    'scripts'
]);