# OKR-Table
A vue application for object management.

## Getting Started
### For development
```
$ git clone https://github.com/jairuigou/okrtable.git
$ cd okrtable
$ npm install
```
After configuring the backend api address in `vue.config.js`, start the development server by using `npm run`.
```
$ npm run serve
```
### Build an image for deployment
```
$ cd okrtable
$ docker build -t okrtable .
```
Create and start a container, need to set environment variable `BACKEND_ADDRESS` to the okrtable backend address.
```
$ docker run -p 8080:80 --env BACKEND_ADDRESS=${backend_address} -d okrtable
```
