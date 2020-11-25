import { ActionTypes, LocalStorageKeys, logJsonStringify } from "../common";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_USERPOOLID,
  ClientId: process.env.REACT_APP_COGNITO_CLIENTID,
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const signupUser = (formData) => {
  return async (dispatch) => {
    const user = {
      name: formData.name,
      username: formData.email,
      email: formData.email,
      phone_number: formData.phone_number,
      password: formData.password,
    };
    logJsonStringify("authActions:signupUser:user:", user);
    const attrList = [];
    attrList.push({
      Name: "phone_number",
      Value: user.phone_number,
    });
    attrList.push({
      Name: "email",
      Value: user.email,
    });
    attrList.push({
      Name: "name",
      Value: user.name,
    });
    userPool.signUp(user.email, user.password, attrList, null, function (err, result) {
      if (err) {
        logJsonStringify("authActions:signupUser:err:", err);
        const actionPayload = {
          signupFailed: true,
          error: err,
          user: undefined,
        };
        return dispatch({
          type: ActionTypes.SIGNUP_USER_FAILED,
          payload: actionPayload,
        });
      } else {
        logJsonStringify("authActions:signupUser:result:", result);
        const cognitoUser = result.user;
        const actionPayload = {
          signedup: true,
          user: cognitoUser,
        };
        return dispatch({
          type: ActionTypes.SIGNUP_USER,
          payload: actionPayload,
        });
      }
    });
  };
};

const loginUser = (formData) => {
  return async (dispatch) => {
    const authenticationData = {
      Username: formData.username,
      Password: formData.password,
    };
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      authenticationData
    );
    const userData = {
      Username: formData.username,
      Pool: userPool,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        logJsonStringify("authActions:loginUser:result:", result);
        localStorage.setItem(LocalStorageKeys.MYTODOS_AUTH_USER, JSON.stringify(result));
        const actionPayload = {
          authenticated: true,
          user: result,
          name: result.idToken.payload.name,
        };
        return dispatch({
          type: ActionTypes.LOGIN_USER,
          payload: actionPayload,
        });
      },
      onFailure: function (err) {
        logJsonStringify("authActions:loginUser:err:", err);
        const actionPayload = {
          authenticated: false,
          loginFailed: true,
          error: err,
          user: undefined,
        };
        logJsonStringify("authActions:loginUser:err:", actionPayload);
        return dispatch({
          type: ActionTypes.LOGIN_USER_FAILED,
          payload: actionPayload,
        });
      },
    });
  };
};

const confirmUser = (formData) => {
  return async (dispatch) => {
    const userData = {
      Username: formData.username,
      Pool: userPool,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.confirmRegistration(formData.code, true, function (err, result) {
      if (err) {
        logJsonStringify("authActions:confirmUser:err:", err);
        const actionPayload = {
          confirmed: false,
          confirmFailed: true,
          error: err,
        };
        return dispatch({
          type: ActionTypes.COFIRM_USER_FAILED,
          payload: actionPayload,
        });
      } else {
        logJsonStringify("authActions:confirmUser:result:", result);
        const actionPayload = {
          confirmed: true,
          error: null,
        };
        return dispatch({
          type: ActionTypes.COFIRM_USER,
          payload: actionPayload,
        });
      }
    });
  };
};

export default {
  signupUser,
  loginUser,
  confirmUser,
};
