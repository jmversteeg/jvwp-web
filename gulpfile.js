'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoPrefixer = require('gulp-autoprefixer');
var streamQueue = require('streamqueue');

gulp.task('styles', function () {

    var scss = gulp.src(['./assets/styles/main.scss'])
        .pipe(sass());

    var css = gulp.src(['./assets/fonts/fontello/css/jvwp-embedded.css']);

    return streamQueue({objectMode: true},
        css, scss)
        .pipe(concat('main.css'))
        .pipe(autoPrefixer())
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