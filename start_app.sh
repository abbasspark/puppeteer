#!/bin/bash

# Update package repositories
pkg update --assume-yes

# Upgrade installed packages
pkg upgrade --assume-yes

# Install necessary packages
pkg install git proot-distro openssh python3 x11-repo tur-repo chromium nodejs -y

# Clone the GitHub repository
git clone https://github.com/abbasspark/puppeteer.git

# Change directory to the cloned repository
cd puppeteer

# Install pm2 globally
npm install pm2 -g

# Start the application using pm2
pm2 start npm --name "puppeteer" -- start

# Save the current pm2 process list
pm2 save

# Setup pm2 startup to run on system boot
pm2 startup
