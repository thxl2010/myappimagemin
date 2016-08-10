'use strict';
let fs = require('fs');
let path = require('path');
let gulp = require('gulp');
let rename = require("gulp-rename");
let imagemin = require('gulp-imagemin');
let pngquant = require('imagemin-pngquant');
//let gm = require('gm');
let imageResize = require('gulp-image-resize');
let imageminJpegRecompress = require('imagemin-jpeg-recompress');
let imageminOptipng = require('imagemin-optipng'); //组件 optipng plugin for imagemin


//eg. gulp imagemin --src c:/1.jpg --dest
gulp.task('imagemin', function() {
    let imgDir = gulp.env.dir;
    let imgSrc = gulp.env.src || 'I:\\Dev_Du\\shomop-sms-www\\src\\main\\resources\\public\\images\\*';
    let imgDest = gulp.env.dest || 'C:\\Users\\swj\\Desktop\\' + Date.now();
    let filePath = imgDir ? imgDir + '/*.{gif,jpg,jpeg,png,svg}' : imgSrc;

    gulp.src(filePath)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()],
            verbose: true
        }))
        //.pipe(rename(`压缩${Date.now()}_${path.basename(imgSrc)}`))
        .pipe(gulp.dest(imgDest));
});

//eg. gulp imgmin --src c:/1.jpg --dest
gulp.task('imgmin', function() {

    let imgDir = gulp.env.dir;
    let imgSrc = gulp.env.src || 'I:\\Dev_Du\\shomop-sms-www\\src\\main\\resources\\public\\images\\*';
    let imgDest = gulp.env.dest || 'C:\\Users\\swj\\Desktop\\' + Date.now();
    let filePath = imgDir ? imgDir + '/*.{gif,jpg,jpeg,png,svg}' : imgSrc;

    var jpgmin = imageminJpegRecompress({
            accurate: true, //高精度模式
            quality: "high", //图像质量:low, medium, high and veryhigh;
            method: "smallfry", //网格优化:mpe, ssim, ms-ssim and smallfry;
            min: 70, //最低质量
            loops: 0, //循环尝试次数, 默认为6;
            progressive: false, //基线优化
            subsample: "default" //子采样:default, disable;
        }),
        pngmin = imageminOptipng({
            optimizationLevel: 4 // 优化级别
        });
    gulp.src(filePath)
        .pipe(imagemin({
            use: [jpgmin, pngmin]
        }))
        .pipe(gulp.dest(imgDest));
});

// 该插件需要依赖：imagemagick(或graphicsmagick)和imagemin-pngquant。
gulp.task('image-resize', function() {
    return gulp.src('I:\\img\\*.+(jpeg|jpg|png)')
        .pipe(imageResize({
            //width: 1000  // 指定宽度，高度自动
            quality: 0.9
        }, {
            imageMagick: true
        }))
        .pipe(gulp.dest('I:\\resize_img_' + Date.now()));
});

gulp.task('resize', function() {
    return gulp.src('I:\\img\\*')

    .pipe(gm(function(gmfile) {

        return gmfile.resize(100, 100);

    }, {
        imageMagick: true
    }))

    .pipe(gulp.dest('I:\\resize_img_' + Date.now()));
});
