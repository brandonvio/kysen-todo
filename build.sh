#!/usr/bin/env bash
npm install

echo "Building lambda."
ls -al

cd ..
cd ./lambda-app
npm run build
echo "Done building lambda."

cd ..
echo "Building cdk."
cd ./cdk-app
npm run build
echo "Done building cdk."
