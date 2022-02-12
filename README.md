# OKR-Table
An vue application for object management.

## Getting Started
### Prerequisites
Create a file named `.env.local` under the project directory and set environment variables. `VUE_APP_ROOTAPI` is the backend api address.
```
# .env.local
VUE_APP_ROOTAPI=http://localhost:3000
```
### Build an image for development
```
$ docker build -t okrtable/okrtable-app
```
Start app container.
```
$ docker run -p 8080:8080 -v ${PWD}:/usr/src/app --name okrtable-app-1 -d okrtable/okrtable-app
```

### Build an image for production
```
$ docker build -t okrtable/okrtable-app -f dockerfile.production
```
Start app container.
```
$ docker run -it -p 8080:80 --name okrtable-app-1 -d okrtable/okrtable-app  
```
