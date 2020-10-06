import React, { useEffect, useState } from "react";
import { ListGroup, Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import moment from "moment";

const fieldSorter = (fields) => (a, b) =>
  fields
    .map((o) => {
      let dir = 1;
      if (o[0] === "-") {
        dir = -1;
        o = o.substring(1);
      }
      return a[o] > b[o] ? dir : a[o] < b[o] ? -dir : 0;
    })
    .reduce((p, n) => (p ? p : n), 0);

export default function TodoList() {
  const [data, setData] = useState([]);
  const [doneTimes, setDoneTimes] = useState([]);
  const { register, handleSubmit } = useForm();
  const [refresh, setRefresh] = useState("");
  const todoUrl = "https://ji8toiaanj.execute-api.us-west-2.amazonaws.com/prod/todos";

  useEffect(() => {
    const fetchData = async () => {
      console.log("getting data...");
      const result = await axios.get(todoUrl);
      const todoData = result.data.sort(fieldSorter(["-todoState", "dueDate"]));
      setData(todoData);

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
          description: "This week...",
          when: moment().add(3, "days").fromNow(),
          value: moment().add(3, "days").toISOString(),
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
    const postData = {
      pk: "brandonv",
      sk: uuidv4(),
      createdDate: new Date().toISOString(),
      description: formData.description,
      todoState: "pending",
      dueDate: formData.dueDate,
    };
    await axios.post(todoUrl, postData);
    setRefresh(uuidv4());
  };

  const updateItem = async (item) => {
    await axios.post(todoUrl, item);
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
          <FormControl ref={register} name="description" required />
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control name="dueDate" as="select" defaultValue="" ref={register} required>
            <option value="">When does it need to be done?</option>
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
              <div className={item.todoState === "done" ? "line-through" : ""}>
                <span style={{ color: "lightblue" }}>Created</span>{" "}
                {moment(item.createdDate).fromNow()}
                {", "}
                <span style={{ color: "lightblue" }}>due</span> {moment(item.dueDate).fromNow()}.
              </div>
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
