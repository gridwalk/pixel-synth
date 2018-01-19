var http         = require('http')                    // node core module to serve data
var gulp         = require('gulp')                    // gulp task runner
var watch        = require('gulp-watch')              // watch for files that change
var sass         = require('gulp-sass')               // compiles sass
var autoprefixer = require('gulp-autoprefixer')       // applies CSS vendor prefixes
var rename       = require('gulp-rename')             // renames files
var livereload   = require('gulp-livereload')         // reload browser when files change
var concat       = require('gulp-concat')             // concatenate scripts
var serveStatic  = require('serve-static')            // serves static files
var finalhandler = require('finalhandler')            // standardizes server response
var opn          = require('opn')                     // opens the browser when we gulp
var jshint       = require('gulp-jshint')             // catches errors in javascript
var stylish      = require('jshint-stylish')          // makes lint errors look nicer
var plumber      = require('gulp-plumber')            // keeps pipes working even when error var ppens
var notify       = require('gulp-notify')             // system notification when error happevar 

// paths to files that are used in the project
var paths = {
	styles:   './src/scss/**/*',
	scripts:  {
    vendor: './src/js/vendor/**/*',
    app:    './src/js/app/**/*',
  },
  images:   './src/img/**/*',
	pages:    './src/html/**/*',
	dist:     './dist'
}

// these tasks execute in order when you run gulp
gulp.task('default', ['styles', 'scripts', 'images', 'html', 'serve',	'watch', 'livereload-listen',	'open'])


/*

███████╗████████╗██╗   ██╗██╗     ███████╗███████╗
██╔════╝╚══██╔══╝╚██╗ ██╔╝██║     ██╔════╝██╔════╝
███████╗   ██║    ╚████╔╝ ██║     █████╗  ███████╗
╚════██║   ██║     ╚██╔╝  ██║     ██╔══╝  ╚════██║
███████║   ██║      ██║   ███████╗███████╗███████║
╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚══════╝╚══════╝

*****************************************************/

// compiles scss files into one, starting from style.scss
// sass searches style.scss for import statements and includes those files
// also minifies resulting css and auto-prefixes for browser compatibility

gulp.task('styles', [], function(){

	// show notification on scss error

	var scssError = function(err){
		notify.onError({
			title:    err.relativePath,
			subtitle: 'Line '+err.line,
			message:  '<%= error.messageOriginal %>'
		})(err)
		this.emit('end')
	}

	// do the scss compilation

	gulp.src('./src/scss/style.scss')
		.pipe(plumber({
				errorHandler: scssError
		}))
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(rename('style.css'))
		.pipe(gulp.dest(paths.dist))
		.pipe(livereload())
})


/*

███████╗ ██████╗██████╗ ██╗██████╗ ████████╗███████╗
██╔════╝██╔════╝██╔══██╗██║██╔══██╗╚══██╔══╝██╔════╝
███████╗██║     ██████╔╝██║██████╔╝   ██║   ███████╗
╚════██║██║     ██╔══██╗██║██╔═══╝    ██║   ╚════██║
███████║╚██████╗██║  ██║██║██║        ██║   ███████║
╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝        ╚═╝   ╚══════╝

********************************************************/

// compiles all JS files into one file
// first concatenates js in vendor folder, then js in app folder

gulp.task('scripts', ['lint'], function(){
	return gulp.src([paths.scripts.vendor,paths.scripts.app])
		.pipe(concat('main.js'))
		.pipe(gulp.dest(paths.dist))
		.pipe(livereload())
})

// shows notification on js error

gulp.task('lint',function(){
	return gulp.src(paths.scripts.app)
		.pipe(plumber())
		.pipe(jshint({
			'asi':true // allows missing semicolons
		}))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(notify(function (file) {  // Use gulp-notify as jshint reporter
			if (file.jshint.success) {
				return false // Don't show something if success
			}
			var errors = file.jshint.results.map(function (data) {
				if (data.error) {
					return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason
				}
			}).join("\n")
			return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors
		}))
})

/*

██╗  ██╗████████╗███╗   ███╗██╗
██║  ██║╚══██╔══╝████╗ ████║██║
███████║   ██║   ██╔████╔██║██║
██╔══██║   ██║   ██║╚██╔╝██║██║
██║  ██║   ██║   ██║ ╚═╝ ██║███████╗
╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝╚══════╝

*************************************/

// just copies HTML to the dist folder, no compilation step
// this exists to gain the benefit of livereload when editing pages

gulp.task('html',['styles','images'], function () {
	return gulp.src(paths.pages)
		.pipe(gulp.dest(paths.dist))
		.pipe(livereload())
})

/*

██╗ ███╗   ███╗  █████╗   ██████╗  ███████╗ ███████╗
██║ ████╗ ████║ ██╔══██╗ ██╔════╝  ██╔════╝ ██╔════╝
██║ ██╔████╔██║ ███████║ ██║  ███╗ █████╗   ███████╗
██║ ██║╚██╔╝██║ ██╔══██║ ██║   ██║ ██╔══╝   ╚════██║
██║ ██║ ╚═╝ ██║ ██║  ██║ ╚██████╔╝ ███████╗ ███████║
╚═╝ ╚═╝     ╚═╝ ╚═╝  ╚═╝  ╚═════╝  ╚══════╝ ╚══════╝

****************************************************/

// just copies images to the dist folder, no processing
// this exists to gain the benefit of livereload when changing images

gulp.task('images', function(){
	return gulp.src(paths.images,{base:'./src/img/'})
	.pipe(gulp.dest(paths.dist+'/img'))
	.pipe(livereload())
})


/*

███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗
██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗
███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝
╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗
███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║
╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝

****************************************************/

// running gulp will start a little server in the dist folder

gulp.task('serve',['html'], function() {

	// Serve up dist folder
	var serve = serveStatic(paths.dist)

	// Start server
	var server = http.createServer(function(req, res){
		var done = finalhandler(req, res)
		serve(req, res, done)
	})

	// Listen for requests on port 3000
	// http://localhost:3000
	server.listen(3000)
})

// opens browser to the page
gulp.task('open',['serve'], function(){
	opn('http://localhost:3000')
})

// tell livereload to start listening for changed files
// when a file changes the browser reloads itself
gulp.task('livereload-listen', function(){
	livereload.listen()
})


/*

██╗    ██╗ █████╗ ████████╗ ██████╗██╗  ██╗
██║    ██║██╔══██╗╚══██╔══╝██╔════╝██║  ██║
██║ █╗ ██║███████║   ██║   ██║     ███████║
██║███╗██║██╔══██║   ██║   ██║     ██╔══██║
╚███╔███╔╝██║  ██║   ██║   ╚██████╗██║  ██║
 ╚══╝╚══╝ ╚═╝  ╚═╝   ╚═╝    ╚═════╝╚═╝  ╚═╝

**********************************************/

// gulp watches the filesystem for changes, then compiles the according files

gulp.task('watch',['serve'], function(){
	
	watch(paths.styles,function(){
		gulp.start('styles')
	})

	watch([paths.scripts.app,paths.scripts.vendor],function(){
		gulp.start('scripts')
	})

	watch(paths.pages,function(){
		gulp.start('html')
	})

	watch(paths.images,function(){
		gulp.start('images')
	})
	
})