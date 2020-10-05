import React, { useEffect, useState } from "react";
import Axios from "axios";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const results = Axios.get(
      "https://ji8toiaanj.execute-api.us-west-2.amazonaws.com/prod/todos"
    ).then((p) => {
      setTodos(p);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
