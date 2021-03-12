const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const browsersync = require('browser-sync').create();
const { src, series, parallel, dest, watch } = require('gulp');


function copyHtml() {
  return src('*.html').pipe(gulp.dest('dist'));
}

function imgTask() {
  return src('src/images/*').pipe(imagemin()).pipe(gulp.dest('dist/images'));
}

function jsTask() {
  return src('./src/javascript/*.js', { sourcemaps: true })
    .pipe(concat('index.js'))
    .pipe(terser())
    .pipe(dest('dist/javascript' , {sourcemaps: '.'}));
}


function scssTask(){
    return src('src/sass/*.scss', { sourcemaps: true })
      .pipe(sass())
      .pipe(concat('style.css'))
        .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(dest('dist/style', { sourcemaps: '.' }));
  }

function browsersyncServe(cb){
    browsersync.init({
      server: {
        baseDir: '.'
      }
    });
    cb();
  }
  
  function browsersyncReload(cb){
    browsersync.reload();
    cb();
  }
  
  // Watch Task
  function watchTask(){
    watch('*.html', browsersyncReload);
    watch(['src/sass/**/*.scss', 'src/javascript/**/*.js'], series(scssTask, jsTask, imgTask, browsersyncReload));
  }
  

exports.scssTask = scssTask;
exports.jsTask = jsTask;
exports.imgTask = imgTask;
exports.copyHtml = copyHtml;
exports.default = series(
  parallel(copyHtml, imgTask, jsTask, scssTask),browsersyncServe,
  watchTask
);