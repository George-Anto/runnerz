#Use the NGINX base image
FROM nginx:alpine

#Install OpenSSL to generate certificates
RUN apk add --no-cache openssl

#Generate self-signed SSL certificates
RUN mkdir -p /etc/ssl/private /etc/ssl/certs && \
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/key.pem \
    -out /etc/ssl/certs/cert.pem \
    -subj "/C=GR/ST=Imathia/L=Naoussa/O=gantoniadis/OU=gantoniadis/CN=localhost"

#Copy the Angular app build to the NGINX directory
COPY ./dist/runnerz-app/browser /usr/share/nginx/html

#Copy custom NGINX configuration
COPY ./default.conf /etc/nginx/conf.d/default.conf

#Expose ports 80 (HTTP) and 443 (HTTPS)
EXPOSE 80 443

#Start NGINX
CMD ["nginx", "-g", "daemon off;"]

