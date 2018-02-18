// https://www.npmjs.com/package/google-maps-react
import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from 'classnames';
// TODO Add refresh comments button
// this.props.refreshAllComments();
export class CommentVotesBox extends Component {
    constructor(props) {
    super(props);
    this.state = {
      userVote: this.props.user_vote,
      totalVotes: this.props.votes
    };
  }
  static propTypes = {
    // eventId: PropTypes.number,
    // refreshComments: PropTypes.func
  };
  handleUpvote(event){
    this.setState({userVote: this.state.userVote + 1, totalVotes: this.state.totalVotes + 1})
    this.handleSubmit("1")
  }
  handleDownvote(event){
    this.setState({userVote: this.state.userVote - 1, totalVotes: this.state.totalVotes - 1})
    this.handleSubmit("-1")
  }
  handleSubmit(vote) {
    $.ajax({
      url: "/comment_vote",
      type: "POST",
      data: {
        comment_id: this.props.commentId,
        vote: vote
      },
      success: function(data, b, c) {
        console.log(data)
        this.setState({userVote: data})
      }.bind(this),
      error: function(error) {
        console.log(error)
      }.bind(this)
    });
  }
  topButton(){
    if (this.state.userVote == "1") {
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
    if (this.state.userVote == "-1") {
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
        <div><button className="btn btn-small comment-vote-button disabled">&#8239;{this.state.totalVotes}</button></div>
        {this.bottomButton()}
      </div>
    );
  }
}
module.exports = CommentVotesBox;