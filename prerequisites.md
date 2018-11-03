#### Prerequisites
-----

On __OSX__ or __Linux__ development workstations,
1) Install [NodeJS](https://nodejs.org/en/download/current/) posssibly with [NVM](https://github.com/creationix/nvm#installation), which may depend
   on the availability of an installed python, and c++ compiler.

2) Install [yarn](https://github.com/yarnpkg/yarn#readme) package manager.

-----
__Linux: develop for example on an older 32 bit workstation with distribution Fedora (25)__

-----

Install whatever version of Python the NVM script will expect:

```
$ sudo dnf install python27
```

Install a version of NVM (check github for later revisions):

```
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

If you are installing the latest NodeJS in for example Fedora (25) on an
older 32 bit workstation, you may need to build NodeJS from source which
will require installing `gcc` :

```
$ sudo dnf install gcc-c++
```

Install a specific version of NodeJS with the node version manager.
If NVM chooses to compile because there is no binary distribution,
then the compile process will take quite a while.

```
$ nvm install 11.0.0
```

Install yarn . Further reading about yarn [usage](https://yarnpkg.com/en/docs/usage)

```
$ npm install yarn --global
```
-----
