var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass')(require('sass'));

function css_style(done){
    gulp.src('./scss/style.scss')
        .pipe(sass({
            errorLogToConsole: true,
            outputStyle:'compressed' 
        }))
        .on('error', console.error.bind(console))
        .pipe(rename({suffix: '.min'})) 
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.stream());
    done();     
} 

function sync(done){
    browserSync.init({
        server:{
            baseDir:'./'
        },
        port:3000
    })
}
// exports.default = css_style;

function watchSass(){
    gulp.watch('./scss/**/*',css_style)
}
function watchFiles(){
    gulp.watch('./scss/**/*',css_style)
    gulp.watch('./**/*.html',browserRelod)
    gulp.watch('./**/*.js',browserRelod)
}
function browserRelod(done){
    browserSync.reload();
    done();
}

gulp.task("default", gulp.parallel(sync, watchFiles,watchSass));
gulp.task(sync);
