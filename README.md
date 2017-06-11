# Kawachat 2 PWA



[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Simple Angular 4 chat app with socket.io 

Live demo: https://kawachat2.surge.sh/

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.0.

The server is available here: https://github.com/avatsaev/kawachat2-server

It features Route Lazy Loading and Angular Service Worker for local caching, no need to run an http server once the service worker cached the app.
![](http://i.imgur.com/bqGF8Gv.png)

![](http://i.imgur.com/1rDosd6.png)

## Install

`$ npm install`

or if you're using yarn 

`$ yarn`

## Service Worker performance analysis

### First load without service worker:

![](http://i.imgur.com/GSfjAF4.png)

### With service worker

![](http://i.imgur.com/GfMJWm6.png)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run pwa-build` to build the project in AoT and Production mode with the Angular Service Worker for local caching. The build artifacts will be stored in the `dist/` directory. 

Use a simple http server to serve the static assets from `dist` folder:

ex: `http-server ./dist`

The app is available at http://localhost:8080

