// https://www.npmjs.com/package/google-maps-react
import React, { Component } from "react";
import PropTypes from "prop-types";

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
				<div className="container-fluid" id="home-card">
					{this.props.text}
					{this.replies()}
				</div>
			</div>
		);
	}
}
module.exports = Comment;