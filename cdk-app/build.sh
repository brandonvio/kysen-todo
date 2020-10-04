#!/usr/bin/env bash
# npm install
# npm install -g webpack-cli
# npm install -g typescript
# ls -al

echo "Building lambda app."
echo $PWD
cd ..
echo $PWD
cd lambda-app
echo $PWD
npm install
npm run build
echo "Done building lambda app."

echo "Building react app."
echo $PWD
cd ..
echo $PWD
cd react-app
echo $PWD
npm install
npm run build
npm run testci
echo "Done building react app."

# cd ..
# echo $PWD
# cd cdk-app
# echo $PWD
# tsc