const gulp = require('gulp');
const ts = require('gulp-typescript');
const nodemon = require('gulp-nodemon')
var clean = require('gulp-clean');
// pull in the project Typescript config
const tsProject = ts.createProject('tsconfig.json');
//task to be run when the watcher detects changes
async function scripts() {
  const tsResult = tsProject.src()
  .pipe(tsProject())
  return tsResult.js.pipe(gulp.dest('build'));
}

function watch() {
   gulp.watch('**/*.ts', scripts);
}



function start(){
  var options = {
    watch: ["src/"],
    script: "./build/config/server/index.js",
  }
  
  nodemon(options);
}

var dev = gulp.series(gulp.parallel(start,scripts, watch));
/*
 * You can still use `gulp.task` to expose tasks
 */
gulp.task('build', scripts);

gulp.task('clean', function () {
  return gulp.src('build/*.js', {read: false})
    .pipe(clean());
});

/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task('default', dev);