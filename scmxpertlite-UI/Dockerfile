# Create image based on the official Node image from dockerhub
FROM node:17

# Create app directory
WORKDIR /scmxpertlite
 
# Copy dependency definitions
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
 
# Install dependencies
#RUN npm set progress=false \
#    && npm config set depth 0 \
#    && npm i install
RUN npm install
 
# Get all the code needed to run the app
COPY . .
 
# Expose the port the app runs in
EXPOSE 3000
 
# Serve the app
CMD ["npm", "start", "--host","0.0.0.0","--port","3000"]