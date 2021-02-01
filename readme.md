# gulp 4.0
npm i -g gulp-cli
初始化项目： npm init -y
npm i -D gulp

新建 gulpfile.js 文件
```js
const { series, parallel } = require('gulp');

function a (cb) {
    console.log('a');
    cb();  // 结束任务 == return;
}
function b (cb) {
    console.log('b');
    cb();
}

exports.default = series(a, b);  // 依次执行任务
exports.default = parallel(a, b);  // 同时执行任务
```
执行文件： gulp
