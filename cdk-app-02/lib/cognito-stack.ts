import * as cdk from "@aws-cdk/core";
import * as cognito from "@aws-cdk/aws-cognito";

/**
 * A stack for the Todo API.
 */
export class TodoCognitoStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new cognito.UserPool(this, "mytodos-userpool", {
      selfSignUpEnabled: true,

      userPoolName: "mytodos-userpool",
      userVerification: {
        emailSubject: "Verify your email for mytodos.xyz!",
        emailBody:
          "Hello {username}, Thanks for signing up to mytodos.xyz! Your verification code is {####}",
        emailStyle: cognito.VerificationEmailStyle.CODE,
        smsMessage:
          "Hello {username}, Thanks for signing up to mytodos.xyz! Your verification code is {####}",
      },
      userInvitation: {
        emailSubject: "Invite to join our mytodos.xyz!",
        emailBody:
          "Hello {username}, you have been invited to join our mytodos.xyz! Your temporary password is {####}",
        smsMessage: "Hello {username}, Your temporary password for our mytodos.xyz is {####}",
      },
      signInAliases: {
        username: true,
        email: true,
        phone: true,
      },
      standardAttributes: {
        fullname: {
          required: true,
          mutable: false,
        },
        address: {
          required: false,
          mutable: true,
        },
      },
      accountRecovery: cognito.AccountRecovery.PHONE_AND_EMAIL,
      customAttributes: {
        myappid: new cognito.StringAttribute({ minLen: 5, maxLen: 15, mutable: false }),
        callingcode: new cognito.NumberAttribute({ min: 1, max: 3, mutable: true }),
        isEmployee: new cognito.BooleanAttribute({ mutable: true }),
        joinedOn: new cognito.DateTimeAttribute(),
      },
    });
  }
}
