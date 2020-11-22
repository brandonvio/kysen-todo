import React from "react";
import TodoApp from "./components/TodoApp";
import AuthPage from "./components/AuthPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
        <Router>
          <AppNavbar />
          <Container>
            <Switch>
              <Route path="/" component={TodoApp} exact />
              <Route path="/auth" component={AuthPage} exact />
            </Switch>
          </Container>
        </Router>
      </Provider>
    </>
  );
}

/*
<Router>
        <Container fluid={false}>
          <NavBar />
          <br />
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/about" component={AboutPage} exact />
            <Route path="/login" component={LoginPage} exact />
            <Route path="/myproperties" component={MyPropertiesPage} exact />
          </Switch>
        </Container>
        <br />
      </Router>
*/

export default App;
