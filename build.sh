#!/bin/sh
echo  "Change directory to react-app."
cd react-app || exit 500

echo  "Run react build."
npm install || exit 500
npm run build || exit 500

echo  "Return to the root directory."
cd ..

echo  "Copy result of build to the CDK project for deployment."
cp -r ./react-app/build ./cdk-app-02/builds/react-app-build || exit 500

echo  "Change directory to lambda-app."
cd lambda-app || exit 500

echo  "Compile typescript."
tsc --extendedDiagnostics || exit 500

echo  "Run build, which runs webpack."
npm install || exit 500
npm run build || exit 500

echo  "Return to the root directory."
cd ..

echo  "Copy result of build to the CDK project for deployment."
cp -r ./lambda-app/build ./cdk-app-02/builds/lambda-app-build || exit 500

echo  "Change directory to ipep-cdk."
cd cdk-app-02 || exit 500

echo  "Run cdk deploy."
npm install || exit 500
npm run build || exit 500
# cdk synth || exit 500
cdk deploy "*" --profile kysen-build-dev

echo  "Return to the root directory."
cd ..

echo  "**** done ****"
