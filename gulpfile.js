var gulp = require('gulp');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var jsFiles = ['*.js', './src/**/*.js'];
var sassFiles = ['./public/css/*.scss'];

gulp.task('sass', function() {
	return gulp.src(sassFiles)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', ['sass'], function() {
	return gulp.watch(sassFiles, ['sass']);
});

gulp.task('default', ['sass:watch'], function() {
	var options = {
		script: 'app.js',
		delayTime: 1,
		env: {
			'PORT': 8000
		},
		watch: jsFiles
	};

	return nodemon(options).on('restart', function(e) {
		console.log('restart');
	});
});