const { src, dest } = require('gulp')
const uglifycss = require('gulp-uglifycss');
const concat = require('gulp-concat')
const sass = require('gulp-sass')

const TransformScss = () => {
  return src('src/scss/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(uglifycss({ 'uglifyComments': false }))
    .pipe(concat('styles.min.css'))
    .pipe(dest('build/css'))
}

module.exports = { TransformScss }