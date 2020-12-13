/**
 * gulp task
 *
 * @author    アルム＝バンド
 * @copyright Copyright (c) アルム＝バンド
 */
/* require
*************************************** */
const _         = require('./gulp/plugin');
const browsersync = require('./gulp/tasks/browsersync');
const ejs = require('./gulp/tasks/ejs');
const js = require('./gulp/tasks/js');
const sass = require('./gulp/tasks/sass');

//Scss
exports.sass = sass;
//ejs
exports.ejs = ejs;
//js
exports.js = js;

//ビルド
const taskBuild = _.gulp.parallel(sass, ejs, js);

//ビルドなし
const taskServer = browsersync;
exports.server = taskServer;

//gulpのデフォルトタスクで諸々を動かす
exports.default = _.gulp.series(taskBuild, taskServer);
