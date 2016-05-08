var config = {

  fonts: {
    src: 'app/fonts/**/*',
    dest: 'dist/fonts'
  },

  images: {
    src: 'app/images/**/*.+(png|jpg|jpeg|gif|svg)',
    dest: 'dist/images',
    options: {
      name: 'project'
    }
  },

  js: {
    src: 'app/js/**/*.js'
  },


  handlebars: {
    src: 'app/pages/**/*.+(html|hbs)',
    data: './app/pages/data.json',
    templates: ['app/pages/templates/'],
    dest: 'app',
    watch: [
      'app/pages/**/*.+(html|hbs)',
      'app/pages/templates/**/*',
      'app/pages/data.json'
    ]
  },

  sass: {
    src: 'app/sass/**/*.scss',
    dest: 'app/css',
    options: {
      includePaths: [
        'app/bower_components',
        'node_modules'
      ]
    }
  },

  uncss: {
    options: {
      html: ['app/*.html'],
      ignore: [
        '.susy-test',
        /.is-/,
        /.has-/
      ]
    }
  },

  useref: {
    src: 'app/*.html',
    dest: 'dist'
  }
};

module.exports = config;
