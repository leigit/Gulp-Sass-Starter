# Gulp-Sass-Starter

This project uses node/npm to compile and output the project.
Please install node version v4.X

## Initialization

Install Node dependencies

~~~
$ npm install
~~~

Install Bower dependencies

~~~
$ bower install
~~~

## Usage

### Development

This project uses [Gulp]() to watch for changes in HTML, Sass, JS, images. Whenever a file is changed, the project is recompiled.

Here are the file locations:

SCSS - `app/scss`
JS - `app/js`
Images - `app/images`

Run this command to get the dev server up and running

~~~
$ gulp
~~~

### Production

Run this command to build for production. Minified and revved files are found under the `dist` folder

~~~
$ gulp build
~~~