const { TransformScss, MinifyJS } = require('./tasks/index')
const gulp = require('gulp')
const browserSync = require('browser-sync')

const watch = () => {
  browserSync.init({ server: { baseDir: '.' } })
  gulp.watch('src/scss/**/*.scss', TransformScss)
  gulp.watch('index.html').on('change', browserSync.reload)
  gulp.watch('src/js/*.js').on('change', browserSync.reload)
}

module.exports.default = gulp.series(TransformScss, MinifyJS, watch)