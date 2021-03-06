var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserify = require('gulp-browserify'),
    react = require('gulp-react'),
    less = require('gulp-less'),
    server = require('gulp-develop-server'),
    plumber = require('gulp-plumber'),
    jest = require('gulp-jest');

var paths = {
    scripts: ['client/js/**/*.react', 'client/js/**/*.js'],
    components: ['client/js/**/*.react'],
    images: 'client/img/**/*',
    styleSheets: 'client/less/**/*.less',
    server: 'server/**/*',
    tests: 'spec/**/*'
};

// default task
gulp.task('default', ['scripts', 'server-react', 'server-js', 'less', 'test'], function () {
    gulp.watch(paths.styleSheets, ['less']);
    gulp.watch(paths.scripts, ['scripts', 'server-js', 'test']);
    gulp.watch(paths.tests, ['test']);
    gulp.watch(paths.components, ['server-react']);
});

// compile less to css
gulp.task('less', function () {
    gulp.src('client/less/nottr.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('./build/css'));
});

// browserify the things
gulp.task('scripts', function () {
    gulp.src('client/js/app/app.js')
        .pipe(plumber())
        .pipe(browserify({
            insertGlobals: true,
            debug: true,
            transform: ['reactify'],
            extensions: ['.react']
        }))
        .pipe(gulp.dest('./build/js'));
});

// run server locally
gulp.task('server:start', function () {
    server.listen({
        path: 'server/index.js',
        env: {
            NODE_ENV: 'local'
        }
    });
});

// restart server if app changed
gulp.task('server', ['server:start'], function () {
    gulp.watch([paths.server], server.restart)
});

// test the things
gulp.task('test', ['scripts'], function () {
    return gulp.src(__dirname).pipe(jest({
        scriptPreprocessor: "./spec/support/preprocessor.js",
        unmockedModulePathPatterns: [
            "node_modules/react",
            "node_modules/request"
        ],
        testFileExtensions: ['js', 'react'],
        testDirectoryName: "spec",
        testPathIgnorePatterns: [
            "node_modules",
            "spec/support"
        ],
        moduleFileExtensions: [
            "js",
            "json",
            "react"
        ]
    }));
});

// compile the react files so the server can render them
gulp.task('server-react', function () {
    return gulp.src('client/js/app/components/**/*.react')
        .pipe(plumber())
        .pipe(react())
        .pipe(gulp.dest('build/server/app/components/'));
});

// copy the client js to a location the server can get at it
gulp.task('server-js', function () {
    return gulp.src(paths.scripts)
        .pipe(gulp.dest('build/server/'));
});
