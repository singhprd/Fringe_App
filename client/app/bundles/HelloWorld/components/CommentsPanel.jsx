// https://www.npmjs.com/package/google-maps-react
import React, { Component } from "react";
import Comment from "./Comment.jsx";
import CommentReplyBox from "./CommentReplyBox.jsx";
import PropTypes from "prop-types";

export class CommentsPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: [],
			showAll: false,
		};
	}
	static propTypes = {
		eventId: PropTypes.number
	};
	componentDidMount() {
		this.getComments();
	}
	refreshComments() {
		this.state.comments = [];
		this.setState({showAll: true});
		this.getComments();
	}
	refreshAllComments(){
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
						[<Comment key={"comment" + data[comment]["id"]} comment={data[comment]} user_vote={data[comment]["user_vote"]} refreshAllComments={this.refreshAllComments.bind(this)}/>]
					)});
			}.bind(this));
			}.bind(this),
			error: function() {
				console.log("failed to create comment");
			}
		});
	}
	// user_vote(data){
	// 	console.log(data)
	// }
	showAllComments() {
		this.setState({showAll: true});
		this.showAllButtonText.style.visibility = "hidden";
	}
	showAllButton() {
		if (this.state.comments.length <= 3) {
			return;
		}
		if (this.state.showAll == true) {
			return;
		} else {
			return( <a ref={(a) => { this.showAllButtonText = a; }} onClick={this.showAllComments.bind(this)} >Show all</a> )
		}
	}
	comments() {
		if (this.state.showAll == true) {
			return(this.state.comments)
		} else {
			return(this.state.comments.slice(0, 3))
		}
	}
	render() {
		return (
			<div>
				<h4>What did you think?</h4>
				{this.comments()}
				{this.showAllButton()}
				<CommentReplyBox eventId={this.props.eventId} refreshComments={this.refreshComments.bind(this)} />
			</div>
		);
	}
}
module.exports = CommentsPanel;