# PrISM
**Clone and run for a quick way to see Electron in action.**

This is *no longer* a minimal Electron application based on the [Quick Start Guide](https://electronjs.org/docs/tutorial/quick-start) within the Electron documentation.

**Use this app along with the [Electron API Demos](https://electronjs.org/#get-started) app for API code examples to help you get started.**

A basic Electron application needs just these files:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.

You can learn more about each of these components within the [Quick Start Guide](https://electronjs.org/docs/tutorial/quick-start).

# To Use

<p align="center">
A boilerplate for Scalable Cross-Platform Desktop Apps based on  <a href="http://electron.atom.io/">Electron</a>, <a href="https://facebook.github.io/react/">React</a>, <a href="https://github.com/reactjs/redux">Redux</a>, <a href="https://github.com/reactjs/react-router">React Router</a>, <a href="http://webpack.github.io/docs/">Webpack</a> and <a href="https://github.com/gaearon/react-transform-hmr">React Transform HMR</a> 
## Install

- **If you have installation or compilation issues with this project, please see [our debugging guide](https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/400)**

First, clone the repo via git:

```bash
git clone --depth=1 https://github.com/electron-react-boilerplate/electron-react-boilerplate.git your-project-name
```

And then install dependencies with yarn.

```bash
$ cd your-project-name
$ yarn
```

## Run

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
$ yarn dev
```

Alternatively, you can run the renderer and main processes separately. This way, you can restart one process without waiting for the other. Run these two commands **simultaneously** in different console tabs:

```bash
$ yarn start-renderer-dev
$ yarn start-main-dev
```

If you don't need autofocus when your files was changed, then run `dev` with env `START_MINIMIZED=true`:

```bash
$ START_MINIMIZED=true yarn dev
```

## Packaging

To package apps for the local platform:

```bash
$ yarn package
```

To package apps for all platforms:

First, refer to [Multi Platform Build](https://www.electron.build/multi-platform-build) for dependencies.

Then,

```bash
$ yarn package-all
```

To package apps with options:

```bash
$ yarn package -- --[option]
```

To run End-to-End Test

```bash
$ yarn build-e2e
$ yarn test-e2e

# Running e2e tests in a minimized window
$ START_MINIMIZED=true yarn build-e2e
$ yarn test-e2e
```

:bulb: You can debug your production build with devtools by simply setting the `DEBUG_PROD` env variable:

```bash
DEBUG_PROD=true yarn package
```

## How to add modules to the project

You will need to add other modules to this boilerplate, depending on the requirements of your project. For example, you may want to add [node-postgres](https://github.com/brianc/node-postgres) to communicate with PostgreSQL database, or
[material-ui](http://www.material-ui.com/) to reuse react UI components.

⚠️ Please read the following section before installing any dependencies ⚠️

### Module Structure

This boilerplate uses a [two package.json structure](https://github.com/electron-userland/electron-builder/wiki/Two-package.json-Structure). This means, you will have two `package.json` files.

1. `./package.json` in the root of your project
1. `./app/package.json` inside `app` folder

### Which `package.json` file to use

**Rule of thumb** is: all modules go into `./package.json` except native modules, or modules with native dependencies or peer dependencies. Native modules, or packages with native dependencies should go into `./app/package.json`.

1. If the module is native to a platform (like node-postgres), it should be listed under `dependencies` in `./app/package.json`
2. If a module is `import`ed by another module, include it in `dependencies` in `./package.json`. See [this ESLint rule](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md). Examples of such modules are `material-ui`, `redux-form`, and `moment`.
3. Otherwise, modules used for building, testing and debugging should be included in `devDependencies` in `./package.json`.

### Further Readings

See the wiki page, [Module Structure — Two package.json Structure](https://github.com/electron-react-boilerplate/electron-react-boilerplate/wiki/Module-Structure----Two-package.json-Structure) to understand what is native module, the rationale behind two package.json structure and more.

For an example app that uses this boilerplate and packages native dependencies, see [erb-sqlite-example](https://github.com/amilajack/erb-sqlite-example).

## CSS Modules

This boilerplate is configured to use [css-modules](https://github.com/css-modules/css-modules) out of the box.

All `.css` file extensions will use css-modules unless it has `.global.css`.

If you need global styles, stylesheets with `.global.css` will not go through the
css-modules loader. e.g. `app.global.css`

If you want to import global css libraries (like `bootstrap`), you can just write the following code in `.global.css`:

```css
@import '~bootstrap/dist/css/bootstrap.css';
```

## Sass support

If you want to use Sass in your app, you only need to import `.sass` files instead of `.css` once:

```js
import './app.global.scss';
```

## Static Type Checking

This project comes with Flow support out of the box! You can annotate your code with types, [get Flow errors as ESLint errors](https://github.com/amilajack/eslint-plugin-flowtype-errors), and get [type errors during runtime](https://github.com/codemix/flow-runtime) during development. Types are completely optional.

## Dispatching redux actions from main process

See [#118](https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/118) and [#108](https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/108)

## How to keep your project updated with the boilerplate

If your application is a fork from this repo, you can add this repo to another git remote:

```sh
git remote add upstream https://github.com/electron-react-boilerplate/electron-react-boilerplate.git
```

Then, use git to merge some latest commits:

```sh
git pull upstream master
```

## Resources for Learning Electron

- [electronjs.org/docs](https://electronjs.org/docs) - all of Electron's documentation
- [electronjs.org/community#boilerplates](https://electronjs.org/community#boilerplates) - sample starter apps created by the community
- [electron/electron-quick-start](https://github.com/electron/electron-quick-start) - a very basic starter Electron app
- [electron/simple-samples](https://github.com/electron/simple-samples) - small applications with ideas for taking them further
- [electron/electron-api-demos](https://github.com/electron/electron-api-demos) - an Electron app that teaches you how to use Electron
- [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps) - small demo apps for the various Electron APIs

## License

[CC0 1.0 (Public Domain)](LICENSE.md)

## License

MIT © [Electron React Boilerplate](https://github.com/electron-react-boilerplate)

