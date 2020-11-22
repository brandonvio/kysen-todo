import React from "react";
import { useDispatch } from "react-redux";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { useForm } from "react-hook-form";
import allActions from "../actions";

/**
 * TodoForm
 * @description Form for adding new Todo items.
 */
export default function AuthPage() {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (formData) => {
    // const todoItem = {
    //   username: "brandonv",
    //   todoId: uuidv4(),
    //   createdDate: new Date().toISOString(),
    //   description: formData.description,
    //   todoState: "pending",
    //   dueDate: formData.dueDate,
    // };
    // dispatch(allActions.todoActions.saveTodo(todoItem));
    reset();
  };
  return (
    <div>
      <h1>my//todos signup form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup className="mb-3">
          <FormControl name="email" placeholder="email" ref={register} required />
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
