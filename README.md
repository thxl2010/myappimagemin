#图片压缩：imagemin搭配组件和参数

1. 组件
  - [imagemin-jpeg-recompress](https://github.com/imagemin/imagemin-jpeg-recompress)
  - [imagemin-optipng](https://github.com/imagemin/imagemin-optipng)

2. task imgmin: gulp imgmin --src c:/1.jpg --dest
```js
gulp.task('imgmin', function() {

    let imgDir = gulp.env.dir;
    let imgSrc = gulp.env.src || 'I:\\Dev_Du\\sms-www\\src\\main\\resources\\public\\images\\*';
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
```