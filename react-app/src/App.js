import React from "react";
import TodoList from "./components/TodoList";
import { Container } from "react-bootstrap";
import { AppNavbar } from "./components/AppNavbar"
import "./App.css";
import "./bootstrap.min.css";

/**
 * App()
 */
function App() {
  return (
    <>
      <AppNavbar />
      <Container>
        <TodoList />
      </Container>
    </>
  );
}

export default App;
