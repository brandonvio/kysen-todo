#!/usr/bin/env bash
echo "Building cdk."
cd cdk-app
npm run build
echo "Done building cdk."

echo "Building lambda."
cd ..
cd lambda-app
npm run build
echo "Done building lambda."

cd ..
cd cdk-app