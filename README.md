# A [Yeoman](http://yeoman.io) generator for Ionic Projects with Gulp

This is a yeoman generator for my [Ionic Gulp Seed](https://github.com/tmaximini/ionic-gulp-seed), a minimal Ionic app template. It sets up everything to get you started with [Gulp](http://gulpjs.com/) and [Ionic](http://ionicframework.com/) in no time.


### Features

* Gulp jobs for development, building, emulating and running your app
* Compiles and concatenates your Sass
* Local development server with live reload, even inside ios emulator
* Automatically inject all your JS sources into `index.html`
* Auto min-safe all Angular DI through `ng-annotate`, no need to use weird bracket notation
* Comes already with [ng-cordova](http://ngcordova.com/) and [lodash](https://lodash.com) included
* generate icon font from svg files
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

In order to compile Sass, you need to have ruby and the sass ruby gem installed: `gem install sass`.

## Workflow

This doc assumes you have `gulp` globally installed (`npm install -g gulp`).
If you do not have / want gulp globally installed, you can run `npm run gulp` instead.

#### Development mode

By running just `gulp`, we start our development build process, consisting of:

- compiling, concatenating, auto-prefixing of all `.scss` files required by `app/styles/main.scss`
- creating `vendor.js` file from external sources defined in `./vendor.json`
- linting all `*.js` files `app/scripts`, see `.jshintrc` for ruleset
- automatically inject sources into `index.html` so we don't have to add / remove sources manually
- build everything into `.tmp` folder (also gitignored)
- start local development server and serve from `.tmp`
- start watchers to automatically lint javascript source files, compile scss and reload browser on changes


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

## Changelog

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
