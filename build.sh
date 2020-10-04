#!/usr/bin/env bash
npm install
npm install -g webpack-cli
npm install -g typescript

echo "Building lambda."
ls -al
echo $PWD

echo $PWD
cd lambda-app
npm install
npm run build
echo "Done building lambda."
cd ..

echo $PWD
echo "Building cdk."
cd cdk-app
npm install
npm run build
echo "Done building cdk."
cd ..

cd cdk-app
echo $PWD