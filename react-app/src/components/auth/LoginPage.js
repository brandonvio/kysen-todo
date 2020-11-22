import React from "react";
import { useDispatch } from "react-redux";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { useForm } from "react-hook-form";
import allActions from "../../actions";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-west-2_eKwrc4n2r",
  ClientId: "78bbksd5g0onmo3uig9re8mmja",
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

/**
 * TodoForm
 * @description Form for adding new Todo items.
 */
export default function LoginPage() {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (formData) => {
    const authenticationData = {
      Username: formData.username,
      Password: formData.password,
    };
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      authenticationData
    );
    const userData = {
      Username: formData.username,
      Pool: userPool,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        console.log(result);
      },
      onFailure: function (err) {
        console.error(JSON.stringify(err));
        return;
      },
    });
  };
  return (
    <div>
      <h1>my//todos signup form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup className="mb-3">
          <FormControl name="username" placeholder="username" ref={register} required />
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control
            name="password"
            placeholder="password"
            ref={register}
            required
            type="password"
          />
        </InputGroup>
        <InputGroup>
          <Button type="submit" variant="info">
            Submit
          </Button>
        </InputGroup>
      </form>
    </div>
  );
}
