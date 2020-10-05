import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TodoList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://ji8toiaanj.execute-api.us-west-2.amazonaws.com/prod/todos"
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {data.map((item) => (
          <li key={item.sk}>{item.description}</li>
        ))}
      </ul>
    </div>
  );
}
