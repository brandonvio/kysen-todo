import React from "react";
import { useDispatch } from "react-redux";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { useForm } from "react-hook-form";
import allActions from "../../actions";

/**
 * TodoForm
 * @description Form for adding new Todo items.
 */
export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (formData) => {
    dispatch(allActions.authActions.loginUser(formData));
  };
  return (
    <div>
      <h1>my//todos login</h1>
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
