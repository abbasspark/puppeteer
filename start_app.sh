#!/bin/bash
pkg install root-repo
pkg install docker
pkg install python3
pip3 install --upgrade pip
pip3 install docker-compose

docker-compose up -d
