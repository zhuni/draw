var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');
    sass = require('gulp-sass');


gulp.task('server', ['sass', 'sass:watch'], function() {
    nodemon({
        script: 'server/server.js',
        ignore: ['gulpfile.js', 'node_modules/' ],
        env: {
            'NODE_ENV': 'development'
        }
    }).on('restart', function() {
        console.log('restart!!!!');
    })
});

gulp.task('sass', function() {
    return gulp.src('./client/public/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./client/public/css'));

});

gulp.task('sass:watch', function() {
    gulp.watch('./client/public/css/*.scss', ['sass']);
})

