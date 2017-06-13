// Requiring packages

var gulp = require('gulp'),
	cssGlobbing = require('gulp-css-globbing'),
	sass = require('gulp-sass'),
    autoPrefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    imageMin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    jsHint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    del = require('del'),
    gulpFilter = require('gulp-filter'),
    mainBowerFiles = require('main-bower-files'),
    connect = require('gulp-connect'),
    gulpIf = require('gulp-if'),
    util = require('gulp-util'),
    plumber = require('gulp-plumber'),
    rigger = require('gulp-rigger'),
	spritesmith = require('gulp.spritesmith'),
    svgSprite = require("gulp-svg-sprites"),
    size = require('gulp-size'),
    opn = require('opn');

// Declaring paths and variables
var src = {
        js: ['./src/js/**/*.js'],
        sass: ['./src/sass/main.{scss,sass}'],
        images: ['./src/img/**/*.*', './src/sass/img/*.svg', '!./src/img/icons/sprites/*.png', '!./src/img/icons/sprites/*.svg'],
        sprite: ['./src/img/icons/*.png'],
        svgsprite: ['./src/img/icons/sprites/*.svg'],
        fonts: ['./src/fonts/**/*.*'],
        html: ['./src/*.html']
    },

    server = {
        host: 'localhost',
        port: '9000'
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
gulp.task('webServer', function() {
    connect.server({
        root: outputDir,
        host: server.host,
        port: server.port,
        livereload: true
    });
});

// Open browser
gulp.task('openBrowser', function() {
    opn( 'http://' + server.host + ':' + server.port);
});

// ~ Clean ~
// Delete build folders
gulp.task('cleanDev', function() {
    del(['./builds/development'], function (err, deletedFiles) {
        console.log('Files deleted:', deletedFiles.join(', '));
    });
});

gulp.task('cleanProd', function() {
    del(['./builds/production'], function (err, deletedFiles) {
        console.log('Files deleted:', deletedFiles.join(', '));
    });
});

gulp.task('clean', function() {
    del(['./builds'], function (err, deletedFiles) {
        console.log('Files deleted:', deletedFiles.join(', '));
    });
});


// ~ Compile styles ~
var cssFilter = gulpFilter('**/*.css');

// Concat vendor CSS (uglify for production)
gulp.task('styles:vendor', function() {
  gulp.src(mainBowerFiles({
          "overrides": {
	          "bootstrap": {
		          "main": [
			          './dist/css/bootstrap.css',
			          './dist/fonts/*.*'
		          ]
	          },
            /*
              "normalize.css": {
                  "main": "./normalize.css"
              },*/

              "magnific-popup": {
                  "main": "./dist/magnific-popup.css"
              },

              "slick-carousel": {
                  "main": [
                      "./slick/slick.css",
                      "./slick/slick-theme.css",
                      "./slick/fonts/!*.*"
                  ]
              },

              "ionrangeslider": {
                  "main": [
                      './css/ion.rangeSlider.css',
                      './css/ion.rangeSlider.skinHTML5.css'
                  ]
              },

              "jquery.form-styler": {
                  "main": "./dist/jquery.formstyler.css"
              },
              
	          "wow": {
		          "main": "./css/libs/animate.css"
	          }
          }
  }))
  .pipe(cssFilter)
  .pipe(concat('vendor.css'))
  .pipe(gulpIf(env !== 'dev', cleanCSS({compatibility: 'ie8'})))
  .pipe(size())
  .pipe(gulp.dest(outputDir + 'css'))
});

// Concat own SASS (uglify for production)

gulp.task('styles', function () {
	gulp.src(src.sass)
		.pipe(plumber({}))
		.pipe(sass({
			precision: 3,
			includePaths: ['.']
		}))
		.pipe(autoPrefixer())
		.pipe(gulp.dest(outputDir + 'css'))
		.pipe(size())
		.pipe(connect.reload())
});


// ~ Compile JS ~
var jsFilter = gulpFilter('**/*.js');

// Concat vendor JS (uglify for production)
gulp.task('js:vendor', function() {
    gulp.src(mainBowerFiles({
          "overrides": {
              "jquery": {
                  "main": "./dist/jquery.min.js"
              },
	
	          "bootstrap": {
		          "main": './dist/js/bootstrap.min.js'
	          },
              
	          "magnific-popup": {
                  "main": "./dist/jquery.magnific-popup.min.js"
              },

             "slick-carousel": {
                  "main": "./slick/slick.min.js"
              },
	
	          "bxslider-4": {
		          "main": './dist/jquery.bxslider.min.js'
	          },

              "jquery.maskedinput": {
                  "main": "./dist/jquery.maskedinput.min.js"
              },

              "jquery.form-styler": {
                  "main": "./dist/jquery.formstyler.min.js"
              },

              "readmore-js": {
                  "main": "./readmore.js"
              },
	
	          "wow": {
		          "main": "./dist/wow.min.js"
	          }
          }
  }))
      .pipe(jsFilter)
      .pipe(concat('vendor.js'))
      .pipe(gulpIf(env !== 'dev', uglify()))
	  .pipe(size())
      .pipe(gulp.dest(outputDir + 'js'))
});

// Concat own JS (uglify for production)
gulp.task('js', function() {
    gulp.src(src.js)
        .pipe(jsHint())
        .pipe(jsHint.reporter('default'))
        .pipe(concat('script.js'))
        .pipe(gulpIf(env !== 'dev', uglify()))
        .pipe(gulp.dest(outputDir + 'js'))
	    .pipe(size())
        .pipe(connect.reload());
});



// ~ Images ~
// Compress images and move 'em to output dir
gulp.task('images', function() {
    return gulp.src(src.images)
        .pipe(imageMin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(outputDir + 'img'))
        .pipe(connect.reload())
});


//SVG-sprite

gulp.task('svgsprite', function() {
    return gulp.src(src.svgsprite)
        .pipe(svgSprite(config = {
            preview: false,
            selector: "icon-%f",
            cssFile: "_svgsprite.scss",
            svg: {
                sprite: "img/sprite.svg"
            },
            dimension       : {
                maxWidth    : 32,
                maxHeight   : 32
            },
            baseSize: 32
        }))
        .pipe(gulp.dest('./src/sass'))
        .pipe(connect.reload())
});

gulp.task('svgsprite-clean', function (cb) {
    del(['./src/sass/img/sprite.svg','./src/sass/_svgsprite.scss'], cb);
});

// ~ Sprite png ~

/*gulp.task('sprite', function () {
	var spriteData = gulp.src(src.sprites).pipe(spritesmith({
		imgName: 'sprite.png',
		cssName: 'sprite.css'
	}));
	return spriteData.pipe(gulp.dest(outputDir + 'img'));
});*/



gulp.task('sprite', function () {
	var spriteData = gulp.src(src.sprites).pipe(spritesmith({
		imgName: '../img/sprite.png',
		cssName: '_sprite.scss',
		cssFormat: 'scss',
		padding: 0
	}));
	
	spriteData.img.pipe(gulp.dest('./src/img'));
	spriteData.css.pipe(gulp.dest('./src/sass'));
});

// Удаление старых файлов
gulp.task('sprite-clean', function (cb) {
    del(['./src/img/sprite.png', './src/sass/_sprite.scss'], cb);
});


// ~ Fonts ~
// Copy fonts to output dir
gulp.task('fonts', function() {
    return gulp.src(src.fonts)
        .pipe(gulp.dest(outputDir + 'fonts'))
        .pipe(connect.reload())
});



// Copy index to output dir (minify for production)
gulp.task('html', function() {
    gulp.src(src.html)
        .pipe(rigger())
        .pipe(gulpIf(env !== 'dev', minifyHTML()))
        .pipe(gulp.dest(outputDir))
	    .pipe(size())
        .pipe(connect.reload())
});


// Watch for changes in /src directories
gulp.task('watch', function() {
    gulp.watch(src.js, ['js']);
    gulp.watch('./src/sass/*.scss', ['styles']);
    gulp.watch('./src/**/*.html', ['html']);
    gulp.watch(src.images, ['images']);
    gulp.watch(src.fonts, ['fonts']);
});



// ~Build tasks~
//Build dev version
gulp.task('build', ['styles:vendor', 'styles', 'js:vendor', 'js', 'images', 'fonts', 'html']);

// Build and run dev environment
gulp.task('default', ['build', 'webServer', 'openBrowser', 'watch']);
