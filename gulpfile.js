var gulp = require('gulp');
var webserver = require('gulp-webserver');
var livereload = require('gulp-livereload');

// 웹서버를 localhost:9400 로 실행한다.
gulp.task('server', function () {
	return gulp.src(dist + '/')
		.pipe(webserver());
});

