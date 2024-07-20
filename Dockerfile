# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.17 as build-stage
RUN mkdir  -p /user/share/nginx/html/etek-app-ui
#RUN mkdir -p /app
#WORKDIR /app
#COPY ./ /app/

#Copy dist
#COPY --from=build-stage /app/dist/out /usr/share/nginx/html

COPY ./dist/out/ /usr/share/nginx/html
COPY ./dist/out /usr/share/nginx/html/etek-app-ui
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf