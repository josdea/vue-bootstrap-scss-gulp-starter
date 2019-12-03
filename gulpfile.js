//install node
//npm update
//npm install --save-dev gulp gulp-sass browser-sync node-sass
//npm install
//gulp

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
sass.compiler = require('node-sass');

//compile scss into css
function style() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass({ outputStyle: "expanded" }).on('error', sass.logError))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
}
function watch() {
    browserSync.init({
        server: {
            baseDir: "./src",
            index: "./index.html"
        }
    });
    gulp.watch('src/scss/**/*.scss', style)
    gulp.watch('src/*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}
exports.style = style;
exports.watch = watch

const build = gulp.series(style, watch);
// const build = gulp.series(clean, gulp.parallel(css, images, jekyll, js));
exports.default = build;



    //above comes from https://medium.com/swlh/setting-up-gulp-4-0-2-for-bootstrap-sass-and-browsersync-7917f5f5d2c5 