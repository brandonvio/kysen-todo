#!/usr/bin/env bash
npm install
npm install -g webpack-cli
npm install -g typescript
ls -al

echo "Building lambda."
echo $PWD
cd ..
echo $PWD
cd lambda-app
echo $PWD
npm install
tsc
webpack -p
echo "Done building lambda."

cd ..
echo $PWD
cd cdk-app
echo $PWD
tsc