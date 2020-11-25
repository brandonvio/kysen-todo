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
export default function SignupPage() {
  const auth = useSelector((state) => state.authReducer.auth);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (formData) => {
    dispatch(allActions.authActions.signupUser(formData));
  };
  if (auth.authenticated) {
    return <Redirect to="/" />;
  }
  if (auth.signedup && !auth.confirmed) {
    return <Redirect to="/auth/confirm" />;
  }
  return (
    <div>
      <h1>my//todos signup</h1>
      {auth.signupFailed && auth.error && <Alert variant="warning">{auth.error.message}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup className="mb-3">
          <FormControl name="name" placeholder="name" ref={register} required />
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
