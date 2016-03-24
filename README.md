# Angular 2.0.0-beta.11 MEAN project
Basic project for experimenting a full-stack javascript MEAN application with Angular2.
Application features:

* NodeJS
* Express
* MongoDB (with [mongojs](https://github.com/mafintosh/mongojs)) 
* Angular 2.0.0-beta.11
* Bootstrap
* gulp
* Less and TypeScript preprocessing

Work on source code inside `client` and `server` folders.
Build a `dist` release folder running `gulp`.


### Config DB
Config your MongoDB connection string in `server/backend/config.js`.


### Start development
Install the npm packages:

`npm install`

Import your .less files in `client/styles/app.less`.

Add your components to `client/app`.

Then process .ts and .less files, and prepare the "dist" folder running:

`gulp`


### TODO
* Remove gulp and rewrite entire build process with NPM scripts
* Currently the build process lack of a source change watcher