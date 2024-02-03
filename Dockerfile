# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=20.7

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /usr/src/app

 

################################################################################
# Create a stage for installing production dependecies.
FROM base as deps

 

################################################################################
# Create a stage for building the application.
FROM deps as build


# Copy the rest of the source files into the image.
COPY . /usr/src/app
COPY . .
# Run the build script.


################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM base as final

# Use production node environment by default.
ENV NODE_ENV production

# Run the application as a non-root user.


# Copy package.json so that package manager commands can be used.
COPY package.json .

RUN npm i 
# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.


RUN npm run build
 
 
#Expose the port that the application listens on.

EXPOSE 3000

# Run the application.
CMD npm start
