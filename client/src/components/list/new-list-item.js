import React, {Component} from "react";
import {reduxForm} from "redux-form";
import {createPost} from "../../actions/index";
import {Link} from "react-router";

class ListItem extends Component {
	handleFormSubmit(formProps){
		//Call action creator to sign up user
		this.props.createPost(formProps);
		//console.log(formProps);
	}
	render(){
		const {fields: {title, topic, url, content}, handleSubmit} = this.props;
		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<h3>Create a New Post</h3>
				<fieldset className="form-group">
					<label>Title:</label>
					<input type="text" className="form-control" {...title} />
				</fieldset>
				<fieldset className="form-group">
					<label>Category:</label>
					<input type="text" className="form-control" {...topic} />
				</fieldset>
				<fieldset className="form-group">
					<label>URL:</label>
					<input type="text" className="form-control" {...url} />
				</fieldset>
				<fieldset className="form-group">
					<label>Content:</label>
					<input type="text" rows="8" className="form-control text" {...content} />
				</fieldset>
				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}

export default reduxForm({
	form: "PostsNewForm",
	fields: ["title", "topic", "url", "content"]
}, null, {createPost})(ListItem);