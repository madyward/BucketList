import axios from "axios";
import {browserHistory} from "react-router";
import {AUTH_USER, UNAUTH_USER, AUTH_ERROR, CREATE_POSTS, FETCH_POSTS} from "./types";
import authReducer from "../reducers/auth_reducer";

const ROOT_URL = "http://localhost:3000";

var config = {
	headers: {authorization: localStorage.getItem("token")}
}

export function signupUser({email, password}){
	return function(dispatch){
		//Submit email/password to server:
		axios.post(`${ROOT_URL}/signup`, {email, password})
		.then(response => {
			dispatch({type: AUTH_USER});

			//Update token:
			localStorage.setItem("token", response.data.token);
			browserHistory.push("/newitem");
		})
		.catch(response => dispatch(authError("response.data.error")));
	}
}

export function signinUser({email, password}){
	return function(dispatch){
		axios.post(`${ROOT_URL}/signin`, {email, password})
		.then(response => {
			//This only kickstarts if the request was good...
			//We now update the state to indicate authenticated user
			dispatch({type: AUTH_USER});
			//This will put the token in localStorage - it's safe!
			localStorage.setItem("token", response.data.token);
			//This sends us off to the /newitem view
			browserHistory.push("/newitem");
		})
		.catch(response => dispatch(authError("Bad login info")));
	}
}

//Purpose of type is to catch unauth_user case.
//Flips auth flag to false & there won't be any links associated w/ them
//...we also need to get rid of their JWT.
export function signoutUser(){
	localStorage.removeItem("token");
	return {type: UNAUTH_USER};
}

export function authError(error){
	return {
		type: AUTH_ERROR,
		payload: error
	};
}

export function createPost(props){
	return function(dispatch){
		axios.post(`${ROOT_URL}/newitem`, {props}, config)
		.then(request => {
			dispatch({
				type: CREATE_POSTS,
				payload: request
			});
			browserHistory.push("/newitem");
		});
	}
}

export function fetchPosts(){
	return function(dispatch){
		axios.get(`${ROOT_URL}/items`, config)
		.then((response) => {
			console.log("Reponse", response)
			dispatch({
				type: FETCH_POSTS,
				payload: response
			});
		});
	}
}




