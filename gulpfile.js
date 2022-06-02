const gulp = require('gulp');
const { parallel, series } = require('gulp');

const pug          = require('gulp-pug');
const sass         = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssnano      = require('gulp-cssnano');
const rename       = require("gulp-rename");
const babel        = require('gulp-babel');
const uglify       = require('gulp-uglify');
const concat       = require('gulp-concat');

//pug => html
const html = () => {
  return gulp.src('./src/*.pug')
    .pipe(pug())
    .pipe(gulp.dest("build"));
};

// scss
const style = () => {
  return gulp.src('src/styles/*.scss')
    .pipe(sass().on('error', sass.logError()))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build/css'));
};

//javascript
const scripts = () => {
  return gulp.src('src/scripts/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    })
  )
  .pipe(uglify())
  .pipe(concat("main.min.js"))
  .pipe(gulp.dest("build/js"));
};






