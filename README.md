# Gulp-Sass-Starter

## Release 2
Release 2 signals some significant changes to this starter kit.
The major change is the separation of each gulp task into its own file, residing in the new 'gulp' directory. The 'build' and 'default' commands still do the same thing.
By default this kit includes a handlebars task.
I have removed the base Sass structure from this repo, and added a link in the Sass README.MD to my Sass boilerplate so that it to can be cloned when necessary. Both of these projects will be maintained separately.
I have deliberately made this a separate release so that anyone using "Release 1" can still do do, by going to the 'Releases' tab and cloning Release 1.


This project uses node/npm to compile and output the project.

## Initialization

Install Node dependencies

~~~
$ npm install
~~~

Install Bower dependencies

~~~
$ bower install
~~~

If you do not have gulp installed globally, install it with the following command

~~~
$ npm install -g gulp
~~~

## Usage

### Development

This project uses [Gulp]() to watch for changes in HTML, Sass, JS, images. Whenever a file is changed, the project is recompiled.

Run this command to compile sass and run the browsersync dev server

~~~
$ gulp
~~~

### Production

Run this command to build for production. Minified files are found under the `dist` folder

~~~
$ gulp build
~~~