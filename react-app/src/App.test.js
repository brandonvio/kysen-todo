import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import "mutationobserver-shim";
global.MutationObserver = window.MutationObserver;

test("renders the todo application", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/When does it need to be done?/i);
  expect(linkElement).toBeInTheDocument();
});
