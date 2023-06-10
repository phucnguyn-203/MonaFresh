FROM node:16.20.0
#Set working directory to /app
WORKDIR /app
#Set PATH /app/node_modules/.bin
ENV PATH /app/node_modules/.bin:$PATH
#Copy package.json in the image
COPY package.json ./

#Install Packages
RUN npm install

#Copy the app
COPY . ./
#Expose application port
EXPOSE 8080

#Start the app
CMD ["npm", "start"]