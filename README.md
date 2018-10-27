# PrISM

**What is this?**
The _PRoduct Innovation and Social Mapping (PrISM™) Tool_ is a project for [Northwest Green Chemistry](https://www.northwestgreenchemistry.org/) craeted by [Seattle GiveCamp 2018](http://seattlegivecamp.org/) volunteers. It was designed to support product designers in developing products based on sustainable green chemistry and engineering design principles.

**Where is my data stored?**
Your data is maintained locally in a file called `prism.json`. It will export at each save and you can load your saved data and re-evaluate at any time.
Northwest Green Chemistry does not transmit client data to a server or maintain your company data. Please keep track of your local data if you wish to revisit your evaluation.

**How do I download it?**
TBD after packaging. 🙃

# For Developers

A basic Electron application needs just these files:

-   `package.json` - Points to the app's main file and lists its details and dependencies.
-   `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
-   `index.html` - A web page to render. This is the app's **renderer process**.

You can learn more about each of these components within the [Quick Start Guide](https://electronjs.org/docs/tutorial/quick-start).

-   **If you have installation or compilation issues with this project, please see [electron-react debugging guide](https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/400)**

First, clone the repo via git; then install dependencies with yarn.

```bash
$ cd PrISM
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

## How to add modules to the project

There have been several modules added to this project, including [material-ui](http://www.material-ui.com/) to reuse react UI components.
Data is managed client-side using [CouchDB](http://couchdb.apache.org/).

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

## Resources for Learning Electron

-   [electronjs.org/docs](https://electronjs.org/docs) - all of Electron's documentation
-   [electronjs.org/community#boilerplates](https://electronjs.org/community#boilerplates) - sample starter apps created by the community
-   [electron/electron-quick-start](https://github.com/electron/electron-quick-start) - a very basic starter Electron app
-   [electron/simple-samples](https://github.com/electron/simple-samples) - small applications with ideas for taking them further
-   [electron/electron-api-demos](https://github.com/electron/electron-api-demos) - an Electron app that teaches you how to use Electron
-   [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps) - small demo apps for the various Electron APIs

## License

[CC0 1.0 (Public Domain)](LICENSE.md)

## License

This project was forked from MIT © [Electron React Boilerplate](https://github.com/electron-react-boilerplate)
