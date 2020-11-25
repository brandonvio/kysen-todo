import React from "react";
import TodoApp from "./components/TodoApp";
import SignupPage from "./components/auth/SignupPage";
import LoginPage from "./components/auth/LoginPage";
import ConfirmPage from "./components/auth/ConfirmPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { AppNavbar } from "./components/AppNavbar";
import "./App.css";
import "./bootstrap.min.css";
import { createStore, applyMiddleware, compose } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));
// const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
// const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

/**
 * App()
 */
function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <AppNavbar />
          <Container>
            <Switch>
              <Route path="/" component={TodoApp} exact />
              <Route path="/auth/signup" component={SignupPage} exact />
              <Route path="/auth/login" component={LoginPage} exact />
              <Route path="/auth/confirm" component={ConfirmPage} exact />
            </Switch>
          </Container>
        </Router>
      </Provider>
    </>
  );
}

export default App;
