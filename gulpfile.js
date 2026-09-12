const { src, dest, watch, series, parallel } = require('gulp');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass')(require('sass'));
const fileInclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');

function htmlTask() {
  return src('src/app/**/*.html')
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

function scssTask() {
  return src('src/app/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

function jsTask() {
  return src('src/app/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

async function imagesTask() {
  const imageminPlugin = (await import('gulp-imagemin')).default;
  return src('src/app/imgs/**/*', { encoding: false })
    .pipe(imageminPlugin())
    .pipe(dest('dist/imgs'))
    .pipe(browserSync.stream());
}

function serverTask(done) { 
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
    port: 3000,
    notify: false
  });
  done();
}

function watchTask() {
  watch('src/app/**/*.html', htmlTask);
  watch('src/app/scss/**/*.scss', scssTask);
  watch('src/app/js/**/*.js', jsTask);
  watch('src/app/imgs/**/*', imagesTask);
}

exports.html = htmlTask;
exports.scss = scssTask;
exports.js = jsTask;
exports.images = imagesTask;

exports.default = series(
  parallel(htmlTask, scssTask, jsTask, imagesTask),
  parallel(serverTask, watchTask)
);