const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');

let SRC = {};

SRC.SCSS = 'app/src/scss/**/*.scss';
SRC.SCRIPTS = [ 'app/src/js/**/*.js', 'app/src/libs/**/*.js' ];
SRC.HTML = 'app/**/*.html';

gulp.task('scss', function() {
	return gulp
		.src(SRC.SCSS)
        .pipe(sass())
		.pipe(gulp.dest('app/src/css'))
        .pipe(browserSync.reload({ stream: true }));
});


gulp.task('scripts', function() {
	return gulp
		.src(SRC.SCRIPTS)
	    .pipe(browserSync.reload({ stream: true }))
});


gulp.task('code', function() {
	return gulp
		.src(SRC.HTML)
	    .pipe(browserSync.reload({ stream: true }))
});


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
        notify: false
	});
});


gulp.task('watch', function() {
	gulp.watch(SRC.SCSS, gulp.parallel('scss'));
	gulp.watch(SRC.SCRIPTS, gulp.parallel('scripts'));
	gulp.watch(SRC.HTML, gulp.parallel('code'));
});


gulp.task('default', gulp.parallel('scss', 'browser-sync', 'watch'));
