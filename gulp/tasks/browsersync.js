const _         = require('../plugin');
const dir       = require('../dir');
const ejs = require('./ejs');
const jsBuild = require('./js');
const sass = require('./sass');

//自動リロード
const browsersync = () => {
    _.browserSync.init({
        server: {
            baseDir: dir.dist.html
        },
        open: 'external',
        https: true
    });

    const sEjs = _.gulp.series(ejs, _.browserSync.reload);
    _.gulp.watch(
        `${dir.src.ejs}/**/*.ejs`
    )
        .on('add',    sEjs)
        .on('change', sEjs)
        .on('unlink', sEjs);
    const sSass = _.gulp.series(sass, _.browserSync.reload);
    _.gulp.watch(
        `${dir.src.scss}/**/*.scss`,
        {
            ignored: [
                `${dir.src.scss}/util/_var.scss`
            ]
        }
    )
        .on('add',    sSass)
        .on('change', sSass)
        .on('unlink', sSass);
    const sJs = _.gulp.series(jsBuild, _.browserSync.reload);
    _.gulp.watch(
        `${dir.src.js}/**/*.js`,
        {
            ignored: [
                `${dir.src.js}/concat/**/*.js`
            ]
        }
    )
        .on('add',    sJs)
        .on('change', sJs)
        .on('unlink', sJs);
};

module.exports = _.gulp.series(browsersync);
