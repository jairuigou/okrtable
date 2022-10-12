FROM node:16 as build-stage
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
COPY --from=build-stage /usr/src/app/nginx-conf/default.conf.template /etc/nginx/templates/
EXPOSE 80
CMD ["nginx","-g","daemon off;"]