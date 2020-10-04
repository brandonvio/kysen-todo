#!/usr/bin/env bash
echo "Building lambda."
cd ..
cd lambda-app
npm run build
echo "Done building lambda."

echo "Building cdk."
cd cdk-app
npm run build
echo "Done building cdk."

cd ..
cd cdk-app