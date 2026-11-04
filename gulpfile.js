const { src, dest, watch, series, parallel } = require('gulp');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass')(require('sass'));
const fileInclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');

function htmlTask() {
  return src('src/app/index.html')
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

function scssTask() {
  return src('src/app/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(concat('index.min.css'))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

function bootstrapCssTask() {
  return src('node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

function bootstrapJsTask() {
  return src('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')
    .pipe(dest('dist/js'))
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
exports.bootstrapCss = bootstrapCssTask;
exports.bootstrapJs = bootstrapJsTask;
exports.js = jsTask;
exports.images = imagesTask;

exports.default = series(
  parallel(htmlTask, scssTask, bootstrapCssTask, bootstrapJsTask, jsTask, imagesTask),
  parallel(serverTask, watchTask)
);