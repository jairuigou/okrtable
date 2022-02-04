# Usage
First, create a env file named `.env.local` and set environment variables
```
# .env.local
VUE_APP_ROOTAPI=http://localhost:3000
```
Next, build images
```
$ docker build -t okrtable/okrtable-app -f dockerfile.production
```
Finally, start app container
```
$ docker run -it -p 8080:80 --rm --name okrtable-app-1 -d okrtable/okrtable-app  
```