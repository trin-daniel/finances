const { src, dest } = require('gulp')
const uglifyJs = require('gulp-uglify')
const concat = require('gulp-concat')
const babel = require('gulp-babel')

const MinifyJS = () => {
  return src(['src/**/util.js', 'src/**/form.js'])
    .pipe(babel(
      { comments: false, presets: ["@babel/preset-env"] }
    ))
    .pipe(uglifyJs())
    .pipe(concat('bundle.min.js'))
    .pipe(dest('build/js'))
}

module.exports = { MinifyJS }