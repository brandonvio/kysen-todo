import React from "react";
import TodoApp from "./components/TodoApp";
import AuthPage from "./components/auth/AuthPage";
import SignupPage from "./components/auth/SignupPage";
import LoginPage from "./components/auth/LoginPage";
import ConfirmPage from "./components/auth/ConfirmPage";
import LogoutPage from "./components/auth/LogoutPage";
import { AppNavbar } from "./components/AppNavbar";
import rootReducer from "./reducers";
import "./App.css";
import "./bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { Container } from "react-bootstrap";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

/**
 * App
 */
function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <AppNavbar />
          <Container>
            <Switch>
              <Route path="/" component={AuthPage} exact />
              <Route path="/todos" component={TodoApp} exact />
              <Route path="/auth/signup" component={SignupPage} exact />
              <Route path="/auth/login" component={LoginPage} exact />
              <Route path="/auth/confirm" component={ConfirmPage} exact />
              <Route path="/auth/logout" component={LogoutPage} exact />
            </Switch>
          </Container>
        </Router>
      </Provider>
    </>
  );
}

export default App;
