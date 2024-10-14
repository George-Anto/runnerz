# Use Node.js for building the Angular app
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /runnerz-app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the Angular app source code
COPY . .

# Build the Angular app for production
RUN npm run build --prod

# Use the NGINX base image for serving the built Angular app
FROM nginx:alpine

# Copy the Angular build output from the previous stage
COPY --from=build /runnerz-app/dist/runnerz-app /usr/share/nginx/html

# Replace environment variable placeholders in env.js
COPY ./src/assets/env.js /usr/share/nginx/html/assets/env.js
RUN sed -i 's/\${NG_APP_SERVER_URL}/'"$NG_APP_SERVER_URL"'/g' /usr/share/nginx/html/assets/env.js

#Expose ports 80 (HTTP) and 443 (HTTPS)
EXPOSE 80 443

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
