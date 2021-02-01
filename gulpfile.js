const { series, src, dest, watch } = require('gulp');
const htmlClean = require('gulp-htmlclean');  // html 文件压缩
const sass = require('gulp-sass');  // sass
const uglify = require('gulp-uglify');  // 代码压缩
const rename = require('gulp-rename');  // 更改文件名
const stripDebug = require('gulp-strip-debug');  // 去除调试信息
const imageMin = require('gulp-imagemin');  // 图片压缩
const connect = require('gulp-connect');  // 服务器
const babel = require('gulp-babel');  // babel 转换

function html () {
    return src('src/*.html')
        .pipe(htmlClean())
        .pipe(dest('dist/'))
        .pipe(connect.reload());
}
function css () {
    return src('src/css/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(dest("dist/css/"))
        .pipe(connect.reload());
}
function js () {
    return src('src/js/*.js')
        // .pipe(dest('dist/js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest('dist/js/'))
        .pipe(connect.reload());
}
function image () {
    return src('src/img/*')
        .pipe(imageMin())
        .pipe(dest('dist/img/'));
}

function server (cb) {
    connect.server({
        port: '2048',
        livereload: true,  // 侦听
    })
    cb();
}

watch('src/*.html', {}, function (cb) {
    html();
    cb();
})
watch('src/css/*.scss', {}, function (cb) {
    css();
    cb();
})
watch('src/js/*.js', {}, function (cb) {
    js();
    cb();
})

exports.default = series(html, css, js, image, server);