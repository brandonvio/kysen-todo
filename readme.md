# mytodos.xyz

## a project for Kysen Build

[github repo](https://github.com/brandonvio/kysen-todo)

Lightweight todo tracking. Serverless. Built with care on AWS using React, Lambda, DynamoDB and the AWS CDK.

Access the running application here:  
[mytodos.xyz](https://mytodos.xyz/)

## architecture - front end

- React, Redux, Thunk
- AWS S3
- AWS Route53
- AWS CloudFront
- AWS Certificate Manager
- CDK
- CDK Pipelines

## architecture - back end

- NodeJS/typescript
- AWS Lambda
- AWS API Gateway
- DynamoDB
- CDK
- CDK Pipelines

![Architecture](https://raw.githubusercontent.com/brandonvio/kysen-todo/master/docs/1601997700538.png)

### CodePipeline for CI/CD

![CodePipeline](https://raw.githubusercontent.com/brandonvio/kysen-todo/master/docs/1602090858938.png)

### Automated Unit Testing

![CodePipeline](https://raw.githubusercontent.com/brandonvio/kysen-todo/master/docs/1602091258073.png)
