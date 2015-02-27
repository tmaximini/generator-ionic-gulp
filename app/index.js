'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

var appPath = path.join(process.cwd(), 'app');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('ionic-gulp') + ' generator. Let\'s build an ionic app, shall we?'
    ));

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'What\'s the app name?',
      default : this.appname // Default to current folder name
    },
    {
      type: 'input',
      name: 'userName',
      message: 'Tell me your name please (for config files)?',
      default : 'Joe Dirt'
    },
    {
      type: 'input',
      name: 'userMail',
      message: 'Your email (for config files)?',
      default : 'email@example.com'
    }

    ];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.userName = props.userName;
      this.userMail = props.userMail;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        { appName: this._.underscored(this.appName),
          userName: this.userName,
          userEmail: this.userMail }
      );
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        { appName: this._.classify(this.appName),
          userName: this.userName,
          userEmail: this.userMail }
      );
      this.fs.copyTpl(
        this.templatePath('_config.xml'),
        this.destinationPath('config.xml'),
        { appName: this.appName,
          userName: this.userName,
          userEmail: this.userMail,
          widgetId: 'com.' + this._.classify(this.userName).toLowerCase() + '.' + this._.classify(this.appName).toLowerCase() }
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );

      this.directory('app', 'app');
      this.directory('hooks', 'hooks');

      this.mkdir('app/icons');
      this.mkdir('app/images');

      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('app/index.html'),
        { title: this.appName, ngModulName: this._.classify(this.appName)  }
      );

      this.fs.copyTpl(
        this.templatePath('home.html'),
        this.destinationPath('app/templates/views/home.html'),
        { title: this.appName }
      );

      this.fs.copyTpl(
        this.templatePath('scripts/homeController.js'),
        this.destinationPath('app/scripts/controllers/homeController.js'),
        { ngModulName: this._.classify(this.appName) }
      );

      this.fs.copyTpl(
        this.templatePath('scripts/mainController.js'),
        this.destinationPath('app/scripts/controllers/mainController.js'),
        { ngModulName: this._.classify(this.appName) }
      );

      this.fs.copyTpl(
        this.templatePath('scripts/settingsController.js'),
        this.destinationPath('app/scripts/controllers/settingsController.js'),
        { ngModulName: this._.classify(this.appName) }
      );

      this.fs.copyTpl(
        this.templatePath('scripts/app.js'),
        this.destinationPath('app/scripts/app.js'),
        { ngModulName: this._.classify(this.appName) }
      );

      this.fs.copyTpl(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js'),
        { ngModulName: this._.classify(this.appName) }
      );

      this.fs.copy(
        this.templatePath('_vendor.json'),
        this.destinationPath('vendor.json')
      );

    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
