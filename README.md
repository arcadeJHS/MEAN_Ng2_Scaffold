# Angular 2.0.0-beta.11 MEAN project
Basic project for experimenting a full-stack javascript MEAN application with Angular2.
Application features:

* NodeJS
* Express
* MongoDB (with [mongojs](https://github.com/mafintosh/mongojs)) 
* Angular 2.0.0-beta.11 (with TypeScript)
* Bootstrap
* gulp
* Less preprocessing

Work on source code inside "client" and "server" folders.
Build a "dist" release folder running `gulp`.


### Config DB
Config your MongoDB connection string in `server/backend/config.js` fie.


### Start development
Install the npm packages:

`npm install`

Import your .less files in `client/styles/app.less`.
Add your components to `client/app`.

Then process .ts and .less files, and prepare the "dist" folder:

`gulp`


### TODO
* Move build process to NPM scripts
* Currently build process lack of a modifications watcher