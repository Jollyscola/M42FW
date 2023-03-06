import pkg from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

const sass = gulpSass(dartSass);
const { src, dest, watch, series } = pkg;

function buildStyles() {
  return src('sass/**/*.scss')
    .pipe(sass())
    .pipe(rename('styles.css'))
    .pipe(dest('css'))

}

function watchTask() {
  watch(['sass/**/*.scss'], buildStyles)
}

export default series(buildStyles, watchTask)
