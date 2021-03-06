# base image
FROM node:12.2.0

# install chrome for protractor tests
# RUN apt-get update && apt-get

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@8.3.9

# add app
COPY . /app

# start app
CMD ng serve --host 0.0.0.0
