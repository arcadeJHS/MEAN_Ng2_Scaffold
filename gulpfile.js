var gulp = require('gulp');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var del = require('del');
var concat = require('gulp-concat')
var runSequence = require('run-sequence');
var less = require('gulp-less');
var exec = require('child_process').exec;

// CLEAN "DIST" FOLDER
gulp.task('clean', function() {
    return del('dist')
});

// SERVER
gulp.task('build:server', function() {
    var copyAppJs = gulp.src('server/app.js').pipe(gulp.dest('dist'))
    var copyServerFolder = gulp.src('server/backend/**/*').pipe(gulp.dest('dist/server'));
    var copyPackageJson = gulp.src('package.json').pipe(gulp.dest('dist'));
    return [copyAppJs, copyServerFolder, copyPackageJson];
});

// CLIENT
var jsNPMDependencies = [
    'angular2/bundles/angular2-polyfills.js',
    'systemjs/dist/system.src.js',
    'rxjs/bundles/Rx.js',
    'angular2/bundles/angular2.js',
    'angular2/bundles/http.js'
];

var lessNPMDependencies = [
    'bootstrap/less/bootstrap.less'
];

gulp.task('build:index', function() {
    var mappedPaths = jsNPMDependencies.map(file => { return path.resolve('node_modules', file) })

    var copyJsNPMDependencies = gulp.src(mappedPaths, { base: 'node_modules' })
        .pipe(gulp.dest('dist/client/libs'))

    var copyIndex = gulp.src('client/index.html')
        .pipe(gulp.dest('dist/client'))

    return [copyJsNPMDependencies, copyIndex];
});

gulp.task('build:copyStatic', function() {
    gulp.src('client/**/*.{html,woff,ttf}').pipe(gulp.dest('dist/client'));
});

gulp.task('build:less', function() {
    // vendor styles
    var mappedVendorLess = lessNPMDependencies.map(file => { return path.resolve('node_modules', file) });
    var copyLessNPMDependencies = gulp.src(mappedVendorLess, { base: 'node_modules' })
        .pipe(less())
        .pipe(gulp.dest('dist/client/libs'));

    //app styles
    var appLess = gulp.src('client/styles/app.less')
        .pipe(less())
        .pipe(gulp.dest('dist/client/styles'));

    return [copyLessNPMDependencies, appLess];
});

gulp.task('build:app', function() {
    var tsProject = ts.createProject('client/tsconfig.json');
    var tsResult = gulp.src('client/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))

    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/client'));
});

gulp.task('server', function(cb) {
    exec('cd dist && node app.js', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('build', function(callback) {
    runSequence('clean', 'build:copyStatic', 'build:server', 'build:index', 'build:app', 'build:less', callback);
});

gulp.task('start', function(callback) {
    runSequence('build', 'server', callback);
});

gulp.task('default', ['start']);