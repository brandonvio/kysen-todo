#!/bin/bash
$echoColor = "Cyan"

Write-Host  "Change directory to react-app." -ForegroundColor $echoColor
cd react-app

Write-Host  "Run react build." -ForegroundColor $echoColor
npm run build

Write-Host  "Return to the root directory." -ForegroundColor $echoColor
cd ..

Write-Host  "Copy result of build to the CDK project for deployment." -ForegroundColor $echoColor
Copy-Item .\react-app\build .\cdk-app\builds\react-app-build -Force -Recurse

Write-Host  "Change directory to lambda-app." -ForegroundColor $echoColor
cd lambda-app

Write-Host  "Compile typescript." -ForegroundColor $echoColor
tsc --extendedDiagnostics

Write-Host  "Run build, which runs webpack." -ForegroundColor $echoColor
npm run build

Write-Host  "Return to the root directory." -ForegroundColor $echoColor
cd ..

Write-Host  "Copy result of build to the CDK project for deployment." -ForegroundColor $echoColor
Copy-Item .\lambda-app\build .\cdk-app\builds\lambda-app-build -Force -Recurse

Write-Host  "Change directory to ipep-cdk." -ForegroundColor $echoColor
cd cdk-app

Write-Host  "Run cdk deploy." -ForegroundColor $echoColor
cdk deploy "*" --profile kysen-build-dev

Write-Host  "Return to the root directory." -ForegroundColor $echoColor
cd ..

Write-Host  "**** done ****" -ForegroundColor $echoColor
