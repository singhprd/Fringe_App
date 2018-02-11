// https://www.npmjs.com/package/google-maps-react
import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentVotesBox from "./CommentVotesBox.jsx";

export class Comment extends Component {
	  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }
	static propTypes = {
		text: PropTypes.string,
		username: PropTypes.string
	};
	expandPanel() {
		this.setState({expanded: true})
	}
	replies() {
		if (this.state.expanded == true) {
			return(<div>reply</div>)
		}
	}
	render() {
		return (
			<div className="panel panel-primary" onClick={this.expandPanel.bind(this)}>
				<div className="panel-heading comment-panel">
					<h5 className="panel-title">{this.props.username} says:</h5>
				</div>
				<div className="container-fluid" id="comment-card">
				  <div className="row"  id="comment-card">
				    <div className="col-xs-1">
				      <CommentVotesBox />
				    </div>
				    <div className="col-xs-1">
				      {this.props.text}
				    </div>
				  </div>	
				</div>
			</div>
		);
	}
}
module.exports = Comment;

// {this.replies()}

// <CommentVotesBox />

// {this.props.text}