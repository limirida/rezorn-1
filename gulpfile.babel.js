import del from 'del';

import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';

import rename from 'gulp-rename';
import gulpif from 'gulp-if';
import browserSync from 'browser-sync';
import errorHandler from 'gulp-error-handle';

import nunjucks from 'gulp-nunjucks-render';
import sass from 'gulp-sass';

import imagemin from 'gulp-imagemin';
import mozjpeg from 'imagemin-mozjpeg';
import imageminWebp from 'imagemin-webp';


const browser = browserSync.create();

const clean = () => del(['dist']);

function libraries(done) {
	gulp.src([
		'node_modules/aos/dist/aos.js', //animate on scroll
		'node_modules/@glidejs/glide/dist/glide.min.js', //slider
		'node_modules/glightbox/dist/js/glightbox.min.js', //lightbox
	])
		.pipe(gulp.dest('dist/js'));

	gulp.src([
		'node_modules/bootstrap/dist/css/bootstrap-grid.min.css', // bootstrap 5
		'node_modules/aos/dist/aos.css', // animate on scroll
		'node_modules/@glidejs/glide/dist/css/glide.core.min.css', //slider
		'node_modules/glightbox/dist/css/glightbox.min.css', //lightbox
	])
		.pipe(gulp.dest('dist/css'));

	done();
}

function scripts() {
	return gulp.src([
		'src/**/*.js',
		'!src/components/stuff/**/*'
	])
		.pipe(errorHandler())
		.pipe(concat('main.js'))
		.pipe(babel())
		.pipe(gulp.dest('dist/js'));
}

function styles() {
	return gulp.src([
		'src/**/*.*css',
		'!src/components/stuff/**/*'
	])
		.pipe(errorHandler())
		.pipe(sass({
			errLogToConsole: true
		}))
		.pipe(concat('main.css'))
		.pipe(gulp.dest('dist/css'));
}

function copyRootFiles() {
	return gulp.src(['src/root/**/*'])
		.pipe(gulp.dest('dist/'));
}

function images(done) {
	const folders = [
		{ src: 'src/i/**/*.{svg,gif,png}', dst: 'dist/i', jpg: false, webp: false },
		{ src: 'src/i/**/*.jpg', dst: 'dist/i', jpg: 85, webp: false },
		{ src: 'src/i/**/*.{png,jpg}', dst: 'dist/i', jpg: false, webp: 80 }
	];

	const tasks = folders.map(({ src, dst, jpg, webp }) =>
		() =>
			gulp.src(src)
				.pipe(gulpif(webp,
					imagemin([
						imageminWebp({ quality: webp })
					])))
				.pipe(gulpif(jpg,
					imagemin([
						mozjpeg({ quality: jpg })
					])))
				.pipe(gulpif(jpg, rename({ extname: '.jpg' })))
				.pipe(gulpif(webp, rename({ extname: '.webp' })))
				.pipe(gulp.dest(dst))
	);

	return gulp.series(...tasks, (seriesDone) => {
		seriesDone();
		done();
	})();
}

function html() {
	return gulp.src('src/pages/**/*.html')
		.pipe(errorHandler())
		.pipe(nunjucks({ path: 'src/' }))
		.pipe(gulp.dest('dist/'))
}

function reload(done) {
	browser.reload();
	done();
}

function sync(done) {
	browser.init({
		open: false,
		server: {
			baseDir: 'dist/',
			serveStaticOptions: {
				extensions: ["html"]
			}
		},
		middleware: function (req, res, next) {
			if (req.url.length > 1 && req.url.slice(-1) == '/')
				req.url = req.url.slice(0, -1);
			return next();
		}
	});
	done();
}

function watch() {
	gulp.watch([
		'src/**/*.js'
	], gulp.series(scripts, reload));

	gulp.watch([
		'src/**/*.*css'
	], gulp.series(styles, reload));

	gulp.watch([
		'src/**/*.html'
	], gulp.series(html, reload));

	gulp.watch('src/i/**/*', gulp.series(images, styles, html, reload));
	gulp.watch('src/*/root/**/*', gulp.series(copyRootFiles, reload));
}

const serve = gulp.series(clean,
	gulp.parallel(libraries, copyRootFiles, images, scripts),
	gulp.parallel(styles, html),
	sync,
	watch
);

const build = gulp.series(clean,
	gulp.parallel(libraries, copyRootFiles, images, scripts),
	gulp.parallel(styles, html)
);

export {
	serve,
	build
};
