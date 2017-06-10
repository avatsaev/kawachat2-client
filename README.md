# Kawachat 2 PWA

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.0.

The server is available here: https://github.com/avatsaev/kawachat2-server

It features Route Lazy Loading and Angular Service Worker for local caching, no need to run an http server once the serice worker cached the app.

## Install

`$ npm install`

or if you're using yarn 

`$ yarn`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run pwa-build` to build the project in AoT and Production mode with the Angular Service Worker for local caching. The build artifacts will be stored in the `dist/` directory. 

Use a simple http server to serve the static assets from `dist` folder:

ex: `http-server ./dist`

The app is available at http://localhost:8080

Considering that Route Lazy Loading doesn't serve the entire app on first visit for faster initial load, but pushes module chunks on the fly as you activate the approritae routes, you'll need to visit all app routes (/home & /chat) in order for the Service Worker to cache the entire app. After that, you can stop the http server and use the app locally by going to http://localhost:8080 .
