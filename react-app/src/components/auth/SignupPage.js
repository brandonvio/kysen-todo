import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { useForm } from "react-hook-form";
import allActions from "../../actions";

/**
 * TodoForm
 * @description Form for adding new Todo items.
 */
export default function SignupPage() {
  const auth = useSelector((state) => state.authReducer.auth);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (formData) => {
    dispatch(allActions.authActions.signupUser(formData));
  };
  return (
    <div>
      <h1>my//todos signup form</h1>
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
