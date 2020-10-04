#!/usr/bin/env bash
npm install
npm install -g webpack-cli
npm install -g typescript

echo "Building lambda."
ls -al
echo $PWD

cd lambda-app
echo $PWD
npm install
npm run build
echo "Done building lambda."
cd ..

cd cdk-app
echo $PWD
npm install
npm run build
