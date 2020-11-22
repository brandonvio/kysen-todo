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
export default function ConfirmPage() {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (formData) => {
    const userData = {
      Username: formData.username,
      Pool: userPool,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.confirmRegistration(formData.code, true, function (err, result) {
      if (err) {
        console.error(JSON.stringify(err));
        return;
      }
      console.log("call result: " + result);
    });
  };
  return (
    <div>
      <h1>my//todos confirm signup</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup className="mb-3">
          <FormControl name="username" placeholder="username" ref={register} required />
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control name="code" placeholder="confirmation code" ref={register} required />
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
