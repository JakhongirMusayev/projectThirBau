const gulp = require('gulp');
const rm = require('gulp-rm');
const pug = require('gulp-pug')
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload; // automatic qayta yuklash uchun-1
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

// Eski usul //'clean' taski 1-turishi kerak
gulp.task('clean', () => {
	return gulp.src('build/**/*', { read: false })
		.pipe(rm());
});

gulp.task('pug', () => {
	return gulp.src('src/pug/index.pug')
		.pipe(pug({ pretty: true }))
		.pipe(gulp.dest('build'))
		.pipe(reload({ stream: true })); // automatic qayta yuklash uchun-2
});
gulp.task('styles', () => {
	return gulp.src('src/styles/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 2 versions'],
			cascade: true
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build'))
		.pipe(reload({ stream: true })); // automatic qayta yuklash uchun-2
});

gulp.task('copy:images', () => {
	return gulp.src('./src/images/**/*.*')
		.pipe(gulp.dest('./build/images/'))
});

gulp.task('copy:fonts', () => {
	return gulp.src('./src/fonts/**/*.*')
		.pipe(gulp.dest('./build/fonts/'))
});

gulp.task('server', () => {
	browserSync.init({
		server: {
			baseDir: './build'
		},
		// open: false
		// browserni qayta-qayta ochmaslik uchun
		// browser 1 marta ochilgach ishlatiladi.
	});
});


gulp.watch('./src/pug/**/*.pug', gulp.series('pug'));
gulp.watch('./src/styles/**/*.scss', gulp.series('styles'));
gulp.watch('./src/images/**/*.*', gulp.series('copy:images'));
gulp.watch('./src/fonts/**/*.*', gulp.series('copy:fonts'));

gulp.task('default', gulp.series('clean', gulp.parallel('pug', 'styles', 'copy:fonts', 'copy:images'), 'server'));



// const { src, dest, task, series } = require('gulp'); Shunday qilsa ham bo'ladi.
// Yangi usul gulp.task o'rniga
// function scss() {
// 	return gulp.src('src/styles/main.scss')
// 		.pipe(gulp.dest('build'))
// }
// Yangi usulniki
// exports.scss = scss