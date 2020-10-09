import React from "react";
import TodoApp from "./components/TodoApp";
import { Container } from "react-bootstrap";
import { AppNavbar } from "./components/AppNavbar";
import "./App.css";
import "./bootstrap.min.css";
import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

// const store = createStore(
//   rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
// const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

/**
 * App()
 */
function App() {
  return (
    <>
      <Provider store={store}>
        <AppNavbar />
        <Container>
          <TodoApp />
        </Container>
      </Provider>
    </>
  );
}

export default App;
