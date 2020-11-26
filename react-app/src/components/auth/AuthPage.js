import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../actions";
import { Redirect } from "react-router-dom";

/**
 * TodoForm
 * @description Form for adding new Todo items.
 * sfdsf
 */
export default function AuthPage() {
  const auth = useSelector((state) => state.authReducer.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allActions.authActions.validateUser());
  });
  if (auth.authenticated) {
    return <Redirect to="/todos" />;
  } else {
    return <Redirect to="/auth/login" />;
  }
}
