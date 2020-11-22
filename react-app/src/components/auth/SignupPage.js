import React from "react";
import { useDispatch } from "react-redux";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { useForm } from "react-hook-form";
import allActions from "../../actions";
import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-west-2_V64yeG3p8",
  ClientId: "3s945cn33jaonfg0u40pdok490",
};

const userPool = new CognitoUserPool(poolData);

/**
 * TodoForm
 * @description Form for adding new Todo items.
 */
export default function SignupPage() {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (formData) => {
    const user = {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      phone_number: formData.phone_number,
      password: formData.password,
    };

    console.log(JSON.stringify(user, null, 2));
    const attrList = [];

    // attrList.push({
    //   Name: "email",
    //   Value: user.email,
    // });

    attrList.push({
      Name: "phone_number",
      Value: user.phone_number,
    });

    attrList.push({
      Name: "email",
      Value: user.email,
    });

    attrList.push({
      Name: "name",
      Value: user.name,
    });

    userPool.signUp(user.username, user.password, attrList, null, function (err, result) {
      if (err) {
        // alert(err.message || JSON.stringify(err));
        console.log(JSON.stringify(err));
        return;
      }
      var cognitoUser = result.user;
      console.log("user name is " + cognitoUser.getUsername());
    });

    // const todoItem = {
    //   username: "brandonv",
    //   todoId: uuidv4(),
    //   createdDate: new Date().toISOString(),
    //   description: formData.description,
    //   todoState: "pending",
    //   dueDate: formData.dueDate,
    // };
    // dispatch(allActions.todoActions.saveTodo(todoItem));
    // reset();
  };
  return (
    <div>
      <h1>my//todos signup form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup className="mb-3">
          <FormControl name="name" placeholder="name" ref={register} required />
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl name="username" placeholder="username" ref={register} required />
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl name="email" placeholder="email" ref={register} required />
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl name="phone_number" placeholder="phone" ref={register} required />
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control name="password" placeholder="password" ref={register} required />
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
