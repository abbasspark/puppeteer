#!/bin/bash
pkg update -y
pkg upgrade -y
pkg install proot-distro openssh python3 -y
pkg install x11-repo -y
pkg install tur-repo -y
pkg install chromium -y
pkg install nodejs -y

npm start