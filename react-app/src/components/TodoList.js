import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ListGroup,
  Form,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import moment from "moment";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const [data, setData] = useState([]);
  const [doneTimes, setDoneTimes] = useState([]);
  const { register, handleSubmit } = useForm();
  const [refresh, setRefresh] = useState("");
  const todoUrl =
    "https://ji8toiaanj.execute-api.us-west-2.amazonaws.com/prod/todos";

  useEffect(() => {
    const fetchData = async () => {
      console.log("getting data...");
      const result = await axios(todoUrl);
      setData(result.data);

      const relativeTimes = [
        {
          description: "Today...",
          when: moment().endOf("day").fromNow(),
          value: moment().endOf("day").toISOString(),
        },
        {
          description: "Tomorrow...",
          when: moment().add(1, "days").fromNow(),
          value: moment().add(1, "days").toISOString(),
        },
        {
          description: "Next week...",
          when: moment().add(7, "days").fromNow(),
          value: moment().add(7, "days").toISOString(),
        },
      ];

      setDoneTimes(relativeTimes);
    };
    fetchData();
  }, [refresh]);

  const onSubmit = async (formData) => {
    console.log(formData);
    const postData = {
      pk: "brandonv",
      sk: uuidv4(),
      createdDate: new Date().toISOString(),
      description: formData.description,
      todoState: "pending",
      dueDate: formData.dueDate,
    };
    console.log(postData);
    const result = await axios.post(todoUrl, postData);
    console.log(result.data);
    setRefresh(uuidv4());
  };

  const updateItem = async (item) => {
    const result = await axios.post(todoUrl, item);
    console.log(result.data);
    setRefresh(uuidv4());
  };

  return (
    <div>
      <h1>Todo...</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>What do you need to do?</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl ref={register} name="description" />
          <Form.Control
            name="dueDate"
            as="select"
            defaultValue="0"
            ref={register}
          >
            <option value="0">When does it need to be done?</option>
            {doneTimes.map((item) => (
              <option key={item.value} value={item.value}>
                {item.description} {item.when}
              </option>
            ))}
          </Form.Control>
          <InputGroup.Append>
            <Button type="submit" variant="primary">
              do it &nbsp; :)
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </form>
      <ListGroup variant="flush">
        {data.map((item) => (
          <ListGroup.Item key={item.sk}>
            <div>
              <div className="form-check">
                <input
                  type="checkbox"
                  id={item.sk}
                  className="form-check-input"
                  checked={item.todoState === "done"}
                  data-keeper-edited="yes"
                  onChange={(e) => {
                    if (item.todoState === "pending") {
                      item.todoState = "done";
                    } else {
                      item.todoState = "pending";
                    }
                    updateItem(item);
                  }}
                />
                <label
                  htmlFor={item.sk}
                  className={item.todoState === "done" ? "line-through" : ""}
                >
                  {item.description}
                </label>
              </div>
            </div>
            <div className={item.todoState === "done" ? "line-through" : ""}>
              <span style={{ color: "lightblue" }}>Created</span>{" "}
              {moment(item.createdDate).fromNow()}
              {", "}
              <span style={{ color: "lightblue" }}>due</span>{" "}
              {moment(item.dueDate).fromNow()}.
            </div>
            <div>
              <Button
                style={{ margin: "0px", padding: "0px" }}
                variant="link"
                onClick={(e) => {
                  item.todoState = "deleted";
                  updateItem(item);
                }}
              >
                archive
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
