FROM node:18
#Create app directory 
WORKDIR /users/dax/desktop/P3_Berche_Benoit/P3OC/P3OC/Backend
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
COPY . .
EXPOSE 8080
CMD [ "node", "server.js" ]

