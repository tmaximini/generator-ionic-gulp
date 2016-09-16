# A [Yeoman](http://yeoman.io) generator for Ionic Projects with Gulp

This is a yeoman generator for my [Ionic Gulp Seed](https://github.com/tmaximini/ionic-gulp-seed), a minimal Ionic app template. It sets up everything to get you started with [Gulp](http://gulpjs.com/) and [Ionic](http://ionicframework.com/) in no time.
Currently using Ionic 1.3.0 and Angular 1.5.3.


### Features

* Gulp jobs for development, building, emulating and running your app
* Compiles and concatenates your Sass
* Local development server with live reload, even inside ios emulator
* Automatically inject all your JS sources into `index.html`
* Auto min-safe all Angular DI through `ng-annotate`, no need to use weird bracket notation
* Easily customize Ionic styles from within your Sass
* Comes already with [ng-cordova](http://ngcordova.com/) and [lodash](https://lodash.com) included
* generate icon font from svg files
* optional browserify support
* Blazing fast


### Installation

[![NPM](https://nodei.co/npm/generator-ionic-gulp.png?downloads=true)](https://nodei.co/npm/generator-ionic-gulp/)

You should have Yeoman installed globally

```bash
npm install -g yo
```

To install generator-ionic-gulp from npm, run:

```bash
npm install -g generator-ionic-gulp
```

Finally, initiate the generator:

```bash
yo ionic-gulp
```

after installation, just run:
```bash
gulp
```
to start up the build job and file watchers.

~~In order to compile Sass, you need to have ruby and the sass ruby gem installed: `gem install sass`.~~
Now using https://github.com/sass/node-sass instead

## Workflow

This doc assumes you have `gulp` globally installed (`npm install -g gulp`).
If you do not have / want gulp globally installed, you can run `npm run gulp` instead.

#### Development mode

By running just `gulp`, we start our development build process, consisting of:

- compiling, concatenating, auto-prefixing of all `.scss` files required by `app/styles/main.scss`
- creating `vendor.js` file from ~~external sources defined in `./vendor.json`~~ from `bower.json` using `wiredep`
- linting all `*.js` files `app/scripts` (or src/ if using browserify), see `.jshintrc` for ruleset
- automatically inject sources into `index.html` so we don't have to add / remove sources manually
- build everything into `.tmp` folder (also gitignored)
- start local development server and serve from `.tmp`
- start watchers to automatically lint javascript source files, compile scss and reload browser on changes

#### Browserify support

If you opted for browserify support all your sources will be kept in app/src instead of app/scripts.
Please check app/src/app.js to see how modules can be added to your angular module.
Browserify will automatically bundle only the code you require and you can require any module you installed with npm (provided they can be used in a webbrowser)

If you opted for browserify support you have sourcemaps available in development mode.
The script bundle and map file will be written in scripts/ and are .gitignored.
The only other file in the scripts/ folder is the configuration.js file for your constants and other settings.

NOTE: Beware that if you bundle (and uglify) angular modules you need to use the pattern where you provide an array with named parameters. See code below for an example of the difference.
```
// When not bundling you can do this
.run( function( $ionicPlatform ) { ... } )

// If you bundle you need to use the following pattern:
.run( [ '$ionicPlatform', function( $ionicPlatform ) { ... } ] )

// You can keep adding parameters like so:
.run( [ '$ionicPlatform', '$q', '$http', function( $ionicPlatform, $q, $http ) { ... } ] )
```

See the browserify website for what you can and cannot do with browserify:
http://browserify.org/

If you need to add transpiling to browserify the location to do so has been marked in the gulpfile.js

#### Build mode

By running just `gulp --build` or short `gulp -b`, we start gulp in build mode

- concat all `.js` sources into single `app.js` file
- version `main.css` and `app.js`
- build everything into `www`
- remove debugs messages such as `console.log` or `alert` with passing `--release`


#### Emulate

By running `gulp -e <platform>`, we can run our app in the simulator

- <platform> can be either `ios` or `android`, defaults to `ios`
- make sure to have iOS Simulator installed in XCode, as well as `ios-sim` package globally installed (`npm install -g ios-sim`)
- for Android, [Ripple](http://ripple.incubator.apache.org/) or [Genymotion](https://www.genymotion.com/) seem to be the emulators of choice
- It will run the `gulp --build` before, so we have a fresh version to test
- In iOS, it will livereload any code changes in iOS simulator

#### Emulate a specific iOS device

By running `gulp select` you will see a prompt where you can choose which ios device to emulate. This works only when you have the `gulp -e` task running in one terminal window and run `gulp select` in another terminal window.


#### Ripple Emulator

Run `gulp ripple` to open your app in a browser using ripple. This is useful for emuating a bunch of different Android devices and settings, such as geolocation, battery status, globalization and more. Note that ripple is still in beta and will show weird debug messages from time to time.


#### Run

By running `gulp -r <platform>`, we can run our app on a connected device

- <platform> can be either `ios` or `android`, defaults to `ios`
- It will run the `gulp --build` before, so we have a fresh version to test

### splash screens and icons

Replace `splash.png` and `icon.png` inside `/resources`. Then run `ionic resources`. If you only want to regenerate icons or splashs, you can run `gulp icon` or `gulp splash` shorthand.

### customizing themes

Just override any Ionic variables in `app/styles/ionic-styles.scss`.


## Changelog

#### 1.5.2
- add ES6 support for browserify builds, thanks @mattrothenberg

#### 1.5.0
- update app template to ionic 1.3.0 / angular 1.5.3 / ngCordova 0.1.26-alpha

#### 1.4.0
- update to ionic 1.2.1, changelog http://blog.ionic.io/announcing-ionic-1-2/
- remove `vendor.json` dependency, use `wiredep` instead, close #21
- remove templates task #13

#### 1.3.3
- bugfix for infinite livereload when using browserify

#### 1.3.2
- added optional browserify support (thanks @Qwerios)

#### 1.3.1
- bump to ionic 1.1.0 which uses angular 1.4.x - changelog http://forum.ionicframework.com/t/1-1-0-xenon-xerus-released/30475

#### 1.3.0
- easier handling of custom ionic theming through `app/styles/ionic-styles.scss` thanks @superthing001
- use `ionic.bundle.js` to reduce bower dependencies in `vendor.json`
- fix iconfont: missing own-icons-template.css

#### 1.2.2
- update to ionic 1.0.1
- keep angular explicitly on 1.3.x branch until Ionic officialy supports 1.4.x [see this thread](http://forum.ionicframework.com/t/angular-1-4-and-ionic/21458/12)


#### 1.2.0
- Drop rubySass in favor of libsass
- compile Ionic .scss dynamically so we can support custom themes
- update to ionic 1.0.0
- update to ngCordova 0.1.17-alpha
- update ro lodash 3.9.3

## License

MIT
