# MitMaro's Gulp Clean Task

A reusable gulp task for clean.

## Usage

    var gulp = require('gulp');
    var clean = require('@mitmaro/gulp-clean');
    
    var options = {
        clean: false
    }
    
    gulp.task('clean', clean('build', options));

## Options

Options|Type|Default
---|---|---
clean | bool | true

## License

This project is released under the ISC license. See [LICENSE](LICENSE).
