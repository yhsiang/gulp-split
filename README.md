#gulp-split

just split your file and remain what you want.

##Usage

```
var split = require("gulp-split");

gulp.src("file.html")
  .pipe(split({
    regex: "<p>"
    index: 1
  }))
  .pipe(gulp.dest("dist"));
```

##License

MIT