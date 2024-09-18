FROM node:18.18.0-alpine as build
WORKDIR /usr/src/app
COPY . .
RUN ls -R
RUN npm install
RUN npm run build
 
# RUNNER IMAGE
FROM nginx:stable as runner

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/src/app/dist /usr/share/nginx/html/dist

RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf
USER nginx
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
