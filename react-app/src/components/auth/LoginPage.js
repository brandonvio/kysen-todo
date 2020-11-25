import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, InputGroup, FormControl, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import allActions from "../../actions";
import { Redirect } from "react-router-dom";

/**
 * TodoForm
 * @description Form for adding new Todo items.
 */
export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const auth = useSelector((state) => state.authReducer.auth);
  const dispatch = useDispatch();
  const onSubmit = async (formData) => {
    dispatch(allActions.authActions.loginUser(formData));
  };
  if (auth.authenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <h1>my//todos login</h1>
      {auth.loginFailed && auth.error && <Alert variant="warning">{auth.error.message}</Alert>}
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
