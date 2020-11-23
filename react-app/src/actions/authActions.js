import axios from "axios";
import moment from "moment";
import { fieldSorter } from "../common";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
const saveTodoUrl = `${apiEndpoint}/savetodos`;
const getTodosUrl = `${apiEndpoint}/gettodos`;

const poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_USERPOOLID,
  ClientId: process.env.REACT_APP_COGNITO_CLIENTID,
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const signupUser = (formData) => {
  const actionType = "SIGNUP_USER";
  return async (dispatch) => {
    const user = {
      name: formData.name,
      username: formData.email,
      email: formData.email,
      phone_number: formData.phone_number,
      password: formData.password,
    };
    console.log(JSON.stringify(user, null, 2));
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
        // alert(err.message || JSON.stringify(err));
        console.error(JSON.stringify(err));
        const actionPayload = {
          auth: {
            authenticated: false,
            error: err,
            user: undefined,
          },
        };
        return dispatch({
          type: actionType,
          payload: actionPayload,
        });
      } else {
        const cognitoUser = result.user;
        // console.log("user name is " + cognitoUser.getUsername());
        const actionPayload = {
          auth: {
            authenticated: true,
            user: cognitoUser,
          },
        };
        return dispatch({
          type: actionType,
          payload: actionPayload,
        });
      }
    });
  };
};

const loginUser = (formData) => {
  const actionType = "LOGIN_USER";
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
        console.log(JSON.stringify(result, null, 2));
        const actionPayload = {
          authenticated: true,
          user: result,
          name: result.idToken.payload.name,
        };
        return dispatch({
          type: actionType,
          payload: actionPayload,
        });
      },
      onFailure: function (err) {
        console.error(JSON.stringify(err));
        const actionPayload = {
          auth: {
            authenticated: false,
            error: err,
            user: undefined,
          },
        };
        return dispatch({
          type: actionType,
          payload: actionPayload,
        });
      },
    });
  };
};

export default {
  signupUser,
  loginUser,
};
