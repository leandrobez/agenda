const gulp = require('gulp');

var ClientOrigin = './src/';
var ClientJSOrigin = './src/js/';
var PathDest = './dist/';

/* Cópia de arquivos html */

gulp.task('copyHTML', () => {
  var HtmlOrigin = ClientOrigin + '*.html';
  var HtmlDest = PathDest;

  gulp.src(HtmlOrigin).pipe(gulp.dest(HtmlDest));
});

/* Cópia de arquivos css */

gulp.task('copyStyles', () => {
  var CssOrigin = ClientOrigin + 'sass/styles.css';
  var CssDest = PathDest + 'css';

  gulp.src(CssOrigin).pipe(gulp.dest(CssDest));
});

/* Cópia de arquivos JavaScript */

gulp.task('copyScript', () => {
  var JsOrigin = ClientJSOrigin + '**/*.js';
  var JsDest = PathDest + 'js/';

  gulp.src(JsOrigin).pipe(gulp.dest(JsDest));
});

gulp.task('default', ['copyScript', 'copyStyles', 'copyHTML'], () => {
  // watch for HTML and CSS changes

  var HtmlOrigin = ClientOrigin + '*.html';
  var CssOrigin = ClientOrigin + 'sass/styles.css';
  var JSOrigin = ClientJSOrigin + '**/*.js';

  var watcherHtml = gulp.watch(HtmlOrigin, () => {
    // run styles upon changes
    gulp.run('copyHTML');
  });

  //changed html
  watcherHtml.on('change', event => {
    console.log(
      '***** Arquivo Html' +
        event.path +
        ' substituído em ' +
        event.type +
        ' *****'
    );
  });

  var watcher = gulp.watch(JSOrigin, () => {
    // run styles upon changes
    gulp.run('copyScript');
  });
  watcher.on('change', event => {
    console.log(
      '***** Arquivo ' + event.path + ' substituído em ' + event.type + ' *****'
    );
  });

  var watcher = gulp.watch(CssOrigin, () => {
    // run styles upon changes
    gulp.run('copyStyles');
  });
  //changed css
  watcher.on('change', event => {
    console.log(
      '***** Arquivo CSS ' +
        event.path +
        ' substituído em ' +
        event.type +
        ' *****'
    );
  });
});
