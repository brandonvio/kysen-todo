import React from "react";
import { render } from "@testing-library/react";
import TodoForm from "./TodoForm";
import "mutationobserver-shim";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
global.MutationObserver = window.MutationObserver;

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

test("renders the todo application", () => {
  const { getByText } = render(
    <Provider store={store}>
      <TodoForm relativeTimes={[]} />
    </Provider>
  );
  const linkElement = getByText(/When does it need to be done?/i);
  expect(linkElement).toBeInTheDocument();
});
