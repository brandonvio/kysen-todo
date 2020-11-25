import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import allActions from "../../actions";

/**
 * LogoutPage
 * @description This page logs the user out of the application.
 */
export default function LogoutPage() {
  const auth = useSelector((state) => state.authReducer.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.authActions.logoutUser());
  }, [dispatch]);

  if (!auth.authenticated) {
    return (
      <>
        <h1>logout</h1>
        <Alert variant="info">
          You've been logged out. <a href="/auth/login">Click here to log back in.</a>
        </Alert>
      </>
    );
  } else {
    return (
      <>
        <div>Logging out...</div>
      </>
    );
  }
}
