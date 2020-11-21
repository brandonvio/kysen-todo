#!/bin/sh
echo  "Change directory to react-app."
cd react-app || exit -1

echo  "Run react build."
npm install || exit -1
npm run build || exit -1

echo  "Return to the root directory."
cd ..

echo  "Copy result of build to the CDK project for deployment."
cp -r ./react-app--xxxx/build ./cdk-app-02/builds/react-app-build || exit -1

echo  "Change directory to lambda-app."
cd lambda-app || exit -1

echo  "Compile typescript."
tsc --extendedDiagnostics || exit -1

echo  "Run build, which runs webpack."
npm install || exit -1
npm run build || exit -1

echo  "Return to the root directory."
cd ..

echo  "Copy result of build to the CDK project for deployment."
cp -r ./lambda-app/build ./cdk-app-02/builds/lambda-app-build || exit -1

echo  "Change directory to ipep-cdk."
cd cdk-app-02 || exit -1

echo  "Run cdk deploy."
npm install || exit -1
npm run build || exit -1
cdk synth || exit -1
# cdk deploy "*" --profile kysen-build-dev

echo  "Return to the root directory."
cd ..

echo  "**** done ****"
