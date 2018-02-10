// https://www.npmjs.com/package/google-maps-react
import React, { Component } from "react";
import Comment from "./Comment.jsx";
import CommentReplyBox from "./CommentReplyBox.jsx";
import PropTypes from "prop-types";

export class CommentsPanel extends Component {
	static propTypes = {
		eventId: PropTypes.number
	};
	constructor(props) {
		super(props);
		this.state = {
			comments: []
		};
	}
	componentDidMount() {
		this.getComments();
	}
	refreshComments() {
		this.state.comments = [];
		this.getComments();
	}
	getComments() {
		$.ajax({
			url: "/events/" + this.props.eventId + "/comments",
			type: "GET",
			success: function(data, b, c) {
				Object.keys(data).map(function(comment) {
					this.setState({comments: this.state.comments.concat(
						[<Comment key={"comment" + data[comment]["id"]} text={data[comment]["text"]}/>]
					)});
				}.bind(this));
			}.bind(this),
			error: function() {
				console.log("failed to create comment");
			}
		});
	}
	render() {
		return (
			<div>
				<h4>What did you think?</h4>
				{this.state.comments}
				<CommentReplyBox eventId={this.props.eventId} refreshComments={this.refreshComments.bind(this)} />
			</div>
		);
	}
}
module.exports = CommentsPanel;