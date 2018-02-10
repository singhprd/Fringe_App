// https://www.npmjs.com/package/google-maps-react
import React, { Component } from "react";
import PropTypes from "prop-types";

export class Comment extends Component {
	static propTypes = {
		text: PropTypes.string,
		username: PropTypes.string
	};
	render() {
		return (
			<div>
				<h5>{this.props.username} says:</h5>
				<p>{this.props.text}</p>
			</div>
		);
	}
}
module.exports = Comment;