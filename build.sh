#!/usr/bin/env bash
npm install
npm install webpack-cli -g

echo "Building lambda."
ls -al
echo $PWD

echo $PWD
cd lambda-app
npm run build
echo "Done building lambda."
cd ..

echo $PWD
echo "Building cdk."
cd cdk-app
npm run build
echo "Done building cdk."
cd ..

cd cdk-app
echo $PWD