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
export default function ConfirmPage() {
  const auth = useSelector((state) => state.authReducer.auth);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (formData) => {
    dispatch(allActions.authActions.confirmUser(formData));
  };
  if (auth.authenticated) {
    return <Redirect to="/" />;
  }
  if (auth.confirmed) {
    return <Redirect to="/auth/login" />;
  }
  return (
    <div>
      <h1>confirm</h1>
      {auth.confirmFailed && auth.error && <Alert variant="warning">{auth.error.message}</Alert>}
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
