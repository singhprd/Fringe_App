// https://www.npmjs.com/package/google-maps-react
import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from 'classnames';


export class CommentVotesBox extends Component {
    constructor(props) {
    super(props);
    this.state = {
      // formError: false
    };
  }
  static propTypes = {
    // eventId: PropTypes.number,
    // refreshComments: PropTypes.func
  };
  handleUpvote(event){
    this.handleSubmit(event, "1")
  }
  handleDownvote(event){
    this.handleSubmit(event, "-1")
  }
  handleSubmit(event, vote) {
    event.preventDefault();

    $.ajax({
      url: "/comment_vote",
      type: "POST",
      data: {
        comment_id: this.props.commentId,
        vote: vote
      },
      success: function(data, b, c) {
        console.log(data)
        this.props.getComments();
      }.bind(this),
      error: function(error) {
        console.log(error)
      }.bind(this)
    });
  }
  topButton(){
    if (this.props.user_vote == "1") {
      return(
        <div><button className="btn btn-small comment-vote-button disabled">😊</button></div>
      )
    } else {
      return  (
        <div><button className="btn btn-small comment-vote-button" onClick={this.handleUpvote.bind(this)}>⬆️</button></div>
        )
    }
  }
  bottomButton(){
    if (this.props.user_vote == "-1") {
      return(
        <div><button className="btn btn-small comment-vote-button disabled">😠</button></div>
      )
    } else {
      return  (
        <div><button className="btn btn-small comment-vote-button" onClick={this.handleDownvote.bind(this)}>⬇️</button></div>
        )
    }
  }
  render() {
    return (
      <div className="col-2">
        {this.topButton()}
        <div><button className="btn btn-small comment-vote-button disabled">&#8239;{this.props.votes}</button></div>
        {this.bottomButton()}
      </div>
    );
  }
}
module.exports = CommentVotesBox;