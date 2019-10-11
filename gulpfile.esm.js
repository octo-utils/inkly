import path from 'path'
import gulp from 'gulp'
import babel from 'gulp-babel'

const babelrc = {
  plugins: [
    "@babel/plugin-transform-modules-commonjs",
    "@babel/plugin-transform-react-jsx"
  ]
}

gulp.task('build:lib', _ => {
  return gulp.src('./src/**/*.js', { base: path.join(__dirname, './src') })
    .pipe(babel(babelrc))
    .pipe(gulp.dest('./lib'));
})

gulp.task("watch:build:lib", gulp.series("build:lib", _ => {
  return gulp.watch(
    ["./src/**/*.js"],
    gulp.series("build:lib")
  );
}))

gulp.task('default', gulp.parallel('build:lib'));
