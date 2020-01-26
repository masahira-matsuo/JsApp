var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var changed  = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var imageminJpg = require('imagemin-jpeg-recompress');
var imageminPng = require('imagemin-pngquant');
var imageminGif = require('imagemin-gifsicle');
var svgmin = require('gulp-svgmin');
var browserSync  = require( 'browser-sync' );
var jsmin = require("gulp-uglify");
var babel = require('gulp-babel');
 
// 圧縮前と圧縮後のディレクトリを定義
var paths = {
    srcDir : 'src',
    dstDir : 'dist',
    cssDir : 'css',
    jsDir : 'js',
    minDir : 'min'
  }

//ｃｓｓの圧縮タスク
gulp.task('cssmin', function (callback) {
    var cssGlob = paths.cssDir + '/*.+(css)';
    var cssminGlob = 'css/'+ paths.minDir;
    gulp.src( cssGlob )
    .pipe(changed( cssminGlob ))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(cssminGlob));

    callback();
});

//jsの圧縮タスク
gulp.task('jsmin', function(callback) {
    var jsGlob = paths.jsDir + '/*.+(js)';
    var jsminGlob = 'js/'+ paths.minDir;
    gulp.src(jsGlob)
        .pipe(babel({
             presets: ['@babel/preset-env']
        }))
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(jsminGlob));
    
    callback();
});

// jpg,png,gif画像の圧縮タスク
gulp.task('imagemin', function(callback){
    var srcGlob = paths.srcDir + '/**/*.+(jpg|jpeg|png|gif)';
    var dstGlob = 'src/'+ paths.dstDir;
    gulp.src( srcGlob )
    .pipe(changed( dstGlob ))
    .pipe(imagemin([
        imageminPng(),
        imageminJpg(),
        imageminGif({
            interlaced: false,
            optimizationLevel: 3,
            colors:180
        })
    ]
    ))
    .pipe(gulp.dest( dstGlob ));
    callback();
});
// svg画像の圧縮タスク
gulp.task('svgmin', function(callback){
    var srcGlob = paths.srcDir + '/**/*.+(svg)';
    var dstGlob = paths.dstDir;
    gulp.src( srcGlob )
    .pipe(changed( dstGlob ))
    .pipe(svgmin())
    .pipe(gulp.dest( dstGlob ));

    callback();
});

//ブラウザ起動タスク
gulp.task('bs', function() {
    return browserSync.init({
        server: {
            baseDir: "./",
            index: "index.html"
        },
        port: 4000,
        reloadOnRestart: true
    });
});
//ブラウザリロードタスク
gulp.task( 'bs-reload', function(callback) {
    browserSync.reload();
    callback();
});

/// 監視フォルダ ////////////////////////////////////////////
gulp.task('watch', function(){
    //gulp.watch('scss/*.scss', gulp.task('sass'));
    gulp.watch(paths.srcDir + '/**/*.+(jpg|jpeg|png|gif)', gulp.parallel('imagemin','bs-reload'));
    gulp.watch(paths.srcDir + '/**/*.+(svg)', gulp.parallel('svgmin','bs-reload'));
    gulp.watch(paths.cssDir +'/*', gulp.parallel('cssmin','bs-reload'));
    gulp.watch(paths.jsDir +'/*', gulp.parallel('jsmin','bs-reload'));
    gulp.watch('/**/*.+(html)', gulp.task('bs-reload'));
});


/// Gulpコマンドで動かすもの ////////////////////////////////////////////
gulp.task('default', gulp.parallel('bs','watch'));