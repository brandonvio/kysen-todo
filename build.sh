echo  "Change directory to react-app."
cd react-app

echo  "Run react build."
npm run build

echo  "Return to the root directory."
cd ..

echo  "Copy result of build to the CDK project for deployment."
cp -r ./react-app/build ./cdk-app-02/builds/react-app-build

echo  "Change directory to lambda-app."
cd lambda-app

echo  "Compile typescript."
tsc --extendedDiagnostics

echo  "Run build, which runs webpack."
npm run build

echo  "Return to the root directory."
cd ..

echo  "Copy result of build to the CDK project for deployment."
cp -r ./lambda-app/build ./cdk-app-02/builds/lambda-app-build

echo  "Change directory to ipep-cdk."
cd cdk-app

echo  "Run cdk deploy."
# cdk deploy "*" --profile kysen-build-dev

echo  "Return to the root directory."
cd ..

echo  "**** done ****"
