export const saveTodoEvent = {
  resource: "/savetodos",
  path: "/savetodos",
  httpMethod: "POST",
  headers: {
    Accept: "*/*",
    "Accept-Encoding": "gzip, deflate, br",
    Authorization:
      "eyJraWQiOiJUTFI1Nlwvb2wyRDlTREoyV3puaEM3cXl5RktQN3ErWituNkM1ZW1jWTBVWT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMDZiMTQ1YS1jNzg5LTRkMTUtYWQ5Ny0xNDhhMjBhNjNlMmMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfZUt3cmM0bjJyIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzp1c2VybmFtZSI6IjIwNmIxNDVhLWM3ODktNGQxNS1hZDk3LTE0OGEyMGE2M2UyYyIsImF1ZCI6Ijc4YmJrc2Q1ZzBvbm1vM3VpZzlyZThtbWphIiwiZXZlbnRfaWQiOiIxZjJmMGY3OS04NmNiLTQyOGYtYjczNy1lYzE1MWIzMmU3NDQiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTYwNjQxMjkxMSwibmFtZSI6IkJyYW5kb24gVmljZWRvbWluaSIsInBob25lX251bWJlciI6IisxNTQxNzk3ODQwOSIsImV4cCI6MTYwNjQxNjUxMSwiaWF0IjoxNjA2NDEyOTExLCJlbWFpbCI6ImJyYW5kb252aW9Ab3V0bG9vay5jb20ifQ.KX4ZMi5O7vXsZq_z-cnbGZer59JcyJ9Kc3p2FZr2mIwPoTp4pwsnD0ytbnWIdfQAUM-rb5j4foIrF0K3m-4TmAZoKC_p0XwuP470p5bHqKCoaEBf-vWwR5kfX2YBql7jR67PTZ105e-bl9rU4K6S6_K80D5MOwq65XekDhPCnHmSc5LyregLFu61aITNHTSxzlcchXYZQ71_AYrwxm5KzHItmDHLWFxAGeJnQeqlgpiY6oNklr8yPy5SSLt0UUTOBtk_s9lZDJnIPixj6N98uoulJoTLZq2lLotRthiQLt_d7VLpxX3rkwkULmVpE0cjquFimX1cO3KZ7fk5kd8Bxg",
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    Host: "api.mytodos.xyz",
    "Postman-Token": "d8184a73-ae66-4de2-8feb-851a58770940",
    "User-Agent": "PostmanRuntime/7.26.5",
    "X-Amzn-Trace-Id": "Root=1-5fbfef7e-2eb607b12a3b53ab5887e23e",
    "X-Forwarded-For": "67.204.152.28",
    "X-Forwarded-Port": "443",
    "X-Forwarded-Proto": "https",
  },
  multiValueHeaders: {
    Accept: ["*/*"],
    "Accept-Encoding": ["gzip, deflate, br"],
    Authorization: [
      "eyJraWQiOiJUTFI1Nlwvb2wyRDlTREoyV3puaEM3cXl5RktQN3ErWituNkM1ZW1jWTBVWT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMDZiMTQ1YS1jNzg5LTRkMTUtYWQ5Ny0xNDhhMjBhNjNlMmMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfZUt3cmM0bjJyIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzp1c2VybmFtZSI6IjIwNmIxNDVhLWM3ODktNGQxNS1hZDk3LTE0OGEyMGE2M2UyYyIsImF1ZCI6Ijc4YmJrc2Q1ZzBvbm1vM3VpZzlyZThtbWphIiwiZXZlbnRfaWQiOiIxZjJmMGY3OS04NmNiLTQyOGYtYjczNy1lYzE1MWIzMmU3NDQiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTYwNjQxMjkxMSwibmFtZSI6IkJyYW5kb24gVmljZWRvbWluaSIsInBob25lX251bWJlciI6IisxNTQxNzk3ODQwOSIsImV4cCI6MTYwNjQxNjUxMSwiaWF0IjoxNjA2NDEyOTExLCJlbWFpbCI6ImJyYW5kb252aW9Ab3V0bG9vay5jb20ifQ.KX4ZMi5O7vXsZq_z-cnbGZer59JcyJ9Kc3p2FZr2mIwPoTp4pwsnD0ytbnWIdfQAUM-rb5j4foIrF0K3m-4TmAZoKC_p0XwuP470p5bHqKCoaEBf-vWwR5kfX2YBql7jR67PTZ105e-bl9rU4K6S6_K80D5MOwq65XekDhPCnHmSc5LyregLFu61aITNHTSxzlcchXYZQ71_AYrwxm5KzHItmDHLWFxAGeJnQeqlgpiY6oNklr8yPy5SSLt0UUTOBtk_s9lZDJnIPixj6N98uoulJoTLZq2lLotRthiQLt_d7VLpxX3rkwkULmVpE0cjquFimX1cO3KZ7fk5kd8Bxg",
    ],
    "Cache-Control": ["no-cache"],
    "Content-Type": ["application/json"],
    Host: ["api.mytodos.xyz"],
    "Postman-Token": ["d8184a73-ae66-4de2-8feb-851a58770940"],
    "User-Agent": ["PostmanRuntime/7.26.5"],
    "X-Amzn-Trace-Id": ["Root=1-5fbfef7e-2eb607b12a3b53ab5887e23e"],
    "X-Forwarded-For": ["67.204.152.28"],
    "X-Forwarded-Port": ["443"],
    "X-Forwarded-Proto": ["https"],
  },
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  pathParameters: null,
  stageVariables: null,
  requestContext: {
    resourceId: "rxr480",
    authorizer: { claims: [Object] },
    resourcePath: "/savetodos",
    httpMethod: "POST",
    extendedRequestId: "WoJbwFjKPHcFUOA=",
    requestTime: "26/Nov/2020:18:10:06 +0000",
    path: "/savetodos",
    accountId: "705871014762",
    protocol: "HTTP/1.1",
    stage: "prod",
    domainPrefix: "api",
    requestTimeEpoch: 1606414206314,
    requestId: "291d0d32-1f2f-489a-97b4-a4d76aab536a",
    identity: {
      cognitoIdentityPoolId: null,
      accountId: null,
      cognitoIdentityId: null,
      caller: null,
      sourceIp: "67.204.152.28",
      principalOrgId: null,
      accessKey: null,
      cognitoAuthenticationType: null,
      cognitoAuthenticationProvider: null,
      userArn: null,
      userAgent: "PostmanRuntime/7.26.5",
      user: null,
    },
    domainName: "api.mytodos.xyz",
    apiId: "ashkog9a41",
  },
  body:
    "{\n" +
    '    "username": "206b145a-c789-4d15-ad97-148a20a63e2c",\n' +
    '    "todoId": "9c2a2678-1143-41a8-a353-b43f15710013",\n' +
    '    "createdDate": "2020-11-26T17:56:59.699Z",\n' +
    '    "description": "Call my mom!",\n' +
    '    "todoState": "pending",\n' +
    '    "dueDate": "2020-11-26T18:56:44.000Z"\n' +
    "}",
  isBase64Encoded: false,
};
