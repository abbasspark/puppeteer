#!/bin/bash

# Build the Docker image
docker build -t puppeteer .

# Run the Docker container
docker run -p 3000:3000 puppeteer
