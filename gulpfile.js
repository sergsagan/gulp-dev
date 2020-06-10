// Requiring packages

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoPrefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const minifyHTML = require('gulp-minify-html');
const imageMin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const jsHint = require('gulp-jshint');
const concat = require('gulp-concat');
const del = require('del');
const gulpFilter = require('gulp-filter');
const mainBowerFiles = require('main-bower-files');
const connect = require('gulp-connect');
const gulpIf = require('gulp-if');
const plumber = require('gulp-plumber');
const rigger = require('gulp-rigger');
const spriteSmith = require('gulp.spritesmith');
const svgSprite = require("gulp-svg-sprites");
const size = require('gulp-size');
const opn = require('opn');
const pug = require('gulp-pug');

// Declaring paths and variables
let src = {
        js: ['./src/js/**/*.js'],
        sass: ['./src/sass/main.{scss,sass}'],
        images: ['./src/img/**/*.*', './src/sass/img/svg/*.svg', '!./src/img/icons/sprites/*.png', '!./src/img/icons/sprites/*.svg'],
        sprite: ['./src/img/icons/*.png'],
        svgsprite: ['./src/img/icons/sprites/*.svg'],
        fonts: ['./src/fonts/**/*.*'],
        html: ['./src/*.html'],
        pug: ['./src/*.pug', '!./src/base.pug']
    },

    server = {
        host: 'localhost',
        port: '9002'
    },

    env,
    outputDir,
    sassStyle,
    sassComments;



// Configuring paths and options for different environments
env = process.env.NODE_ENV || 'dev';

if (env === 'dev') {
    outputDir = 'builds/development/';
    sassStyle = 'expanded';
    sassComments = true;
} else {
    outputDir = 'builds/production/';
    sassStyle = 'compressed';
    sassComments = false;
}


/**********
 * ~TASKS~
 **********/

// Start webserver
const webServer = () => {
    connect.server({
        root: outputDir,
        host: server.host,
        port: server.port,
        livereload: true
    });
}
exports.webServer = webServer;


// Open browser
const openBrowser = () => {
    opn( 'http://' + server.host + ':' + server.port);
}
exports.openBrowser = openBrowser;

// ~ Clean ~
// Delete build folders
const cleanDev = () => {
    del(['./builds/development'], function (err, deletedFiles) {
        console.log('Files deleted:', deletedFiles.join(', '));
    });
}
exports.cleanDev = cleanDev;

const cleanProd = () => {
    del(['./builds/production'], function (err, deletedFiles) {
        console.log('Files deleted:', deletedFiles.join(', '));
    });
}
exports.cleanProd = cleanProd;

const clean = () => {
    del(['./builds'], function (err, deletedFiles) {
        console.log('Files deleted:', deletedFiles.join(', '));
    });
}
exports.clean = clean;


// ~ Compile styles ~
const cssFilter = gulpFilter('**/*.css');

// Concat vendor CSS (uglify for production)
const stylesVendor = () => {
    return gulp.src(mainBowerFiles({
        "overrides": {
            "slick-carousel": {
                "main": [
                    "./slick/slick.css",
                    "./slick/slick-theme.css",
                    "./slick/fonts/!*.*"
                ]
            }
        }
    }))
        .pipe(cssFilter)
        .pipe(concat('vendor.css'))
        .pipe(gulpIf(env !== 'dev', cleanCSS({compatibility: 'ie8'})))
        .pipe(size())
        .pipe(gulp.dest(outputDir + 'css'))
}
exports.stylesVendor = stylesVendor;

// Concat own SASS (uglify for production)
const styles = () => {
    return gulp.src(src.sass)
        .pipe(plumber({}))
        .pipe(sass({
            precision: 3,
            includePaths: ['.']
        }))
        .pipe(autoPrefixer())
        .pipe(gulp.dest(outputDir + 'css'))
        .pipe(size())
        .pipe(connect.reload())
}
exports.styles = styles;


// ~ Compile JS ~
const jsFilter = gulpFilter('**/*.js');

// Concat vendor JS (uglify for production)
const jsVendor = () => {
   return gulp.src(mainBowerFiles({
        "overrides": {
            "jquery": {
                "main": "./dist/jquery.min.js"
            },

            "slick-carousel": {
                "main": "./slick/slick.min.js"
            }
        },
        allowEmpty: true
        }))
        .pipe(jsFilter)
        .pipe(concat('vendor.js'))
        .pipe(gulpIf(env !== 'dev', uglify()))
        .pipe(size())
        .pipe(gulp.dest(outputDir + 'js'))
}
exports.jsVendor = jsVendor;

// Concat own JS (uglify for production)
const js = () => {
    return gulp.src(src.js)
        .pipe(jsHint())
        .pipe(jsHint.reporter('default'))
        .pipe(concat('script.js'))
        .pipe(gulpIf(env !== 'dev', uglify()))
        .pipe(gulp.dest(outputDir + 'js'))
        .pipe(size())
        .pipe(connect.reload());
}
exports.js = js;

// ~ Images ~
// Compress images and move 'em to output dir
const images = () => {
    return gulp.src(src.images)
        .pipe(imageMin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [imageminPngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(outputDir + 'img'))
        .pipe(connect.reload())
}
exports.images = images;

//SVG-sprite
const svgSprites = () => {
    return gulp.src(src.svgsprite)
        .pipe(svgSprite(config = {
            shape: {
                dimension: {         // Set maximum dimensions
                    maxWidth: 500,
                    maxHeight: 500
                },
                spacing: {         // Add padding
                    padding: 0
                }
            },
            mode: {
                symbol: {
                    dest : '.'
                }
            }
        }))
        .pipe(gulp.dest('./src/img/'));
}
exports.svgSprites = svgSprites;

const svgSpritesClean = () => {
    del(['./src/sass/img/svg'], cb);
}
exports.svgSpritesClean = svgSpritesClean;

// ~ Sprite png ~

const sprite = () => {
    const spriteData = gulp.src(src.sprite).pipe(spriteSmith({
        imgName: '../img/sprite.png',
        cssName: '_sprite.scss',
        cssFormat: 'scss',
        padding: 0
    }));

    spriteData.img.pipe(gulp.dest('./src/img'));
    spriteData.css.pipe(gulp.dest('./src/sass/utils'));
}
exports.sprite = sprite;

// Удаление старых файлов
const spriteClean = (cb) => {
    del(['./src/img/sprite.png', './src/sass/_sprite.scss'], cb);
}
exports.spriteClean = spriteClean;


// ~ Fonts ~
// Copy fonts to output dir
const fonts = () => {
    return gulp.src(src.fonts)
        .pipe(gulp.dest(outputDir + 'fonts'))
        .pipe(connect.reload())
}
exports.fonts = fonts;


// Copy index to output dir (minify for production)
const html = () => {
    return gulp.src(src.html)
        .pipe(rigger())
        .pipe(gulpIf(env !== 'dev', minifyHTML()))
        .pipe(gulp.dest(outputDir))
        .pipe(size())
        .pipe(connect.reload())
}
exports.html = html;

const pugTemplate = () => {
    return gulp.src(src.pug)
        .pipe(rigger())
        .pipe(pug({
            pretty: '\t'
        }))
        .pipe(gulp.dest(outputDir))
        .pipe(connect.reload())
}
exports.pugTemplate = pugTemplate;

// Watch for changes in /src directories
const watch = () => {
    gulp.watch(src.js, gulp.series(js));
    gulp.watch('./src/sass/*.scss', gulp.series(styles));
    gulp.watch('./src/**/*.pug', gulp.series(pugTemplate));
    gulp.watch(src.images, gulp.series(images));
    gulp.watch(src.fonts, gulp.series(fonts));
}
exports.watch = watch;

// Build and run dev environment
exports.default = gulp.series (
    gulp.parallel (
        stylesVendor,
        styles,
        jsVendor,
        js,
        images,
        fonts,
        pugTemplate
    ),
    gulp.parallel(
        watch,
        webServer,
        openBrowser
    )
)
