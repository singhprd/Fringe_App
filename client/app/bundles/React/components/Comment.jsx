// https://www.npmjs.com/package/google-maps-react
import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentVotesBox from "./CommentVotesBox.jsx";

export class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      text: this.props.comment.text,
      editMode: false
    };
  }
  static propTypes = {
    // votes: PropTypes.string,
    // username: PropTypes.string
  };
  expandPanel() {
    this.setState({ expanded: true });
  }
  replies() {
    if (this.state.expanded == true) {
      return <div>reply</div>;
    }
  }
  toggleEditMode() {
    this.setState({ editMode: !this.state.editMode });
  }
  commentActions() {
    if (this.props.currentUserId === this.props.comment.user_id) {
      return (
        <div className="col-xs-2 pull-right">
          <div className="btn-group pull-right" role="group">
            <button
              onClick={() => this.toggleEditMode()}
              className="btn btn-xs btn-default"
            >
              Edit
            </button>
          </div>
        </div>
      );
    }
  }
  CommentVotesBox() {
    return(
    <div className="col-xs-2">
              <CommentVotesBox
                commentId={this.props.comment.id}
                votes={this.props.comment.votes}
                user_vote={this.props.user_vote}
                getComments={this.props.getComments}
              />
            </div>
            )
  }
  submitCommentUpdate() {
    $.ajax({
      url: "/comments/" + this.props.comment.id,
      type: "PUT",
      dataType: "json",
      data: {
        text: this.commentUpdateForm.value
      },
      success: function(data, b, c) {
        this.setState({ text: data.text, editMode: false });
      }.bind(this),
      error: function(e) {
        console.warn(e);
      }.bind(this)
    });
  }
  deleteComment() {
    $.ajax({
      url: "/comments/" + this.props.comment.id,
      type: "DELETE",
      dataType: "json",
      success: function(data, b, c) {
        this.props.refreshAllComments();
        console.log(data);
      }.bind(this),
      error: function(e) {
        console.warn(e);
      }.bind(this)
    });
  }
  fullCommentView() {
    if (this.state.editMode == true) {
     return (
      <div>
      <div className="row"  id="comment-card">
        {this.CommentVotesBox()}
          <div className="col-xs-8">
            <form>
              <textarea
                ref={input => {
                  this.commentUpdateForm = input;
                }}
                name="commentUpdateForm"
                rows="3"
                defaultValue={this.state.text}
                className="form-control"
                rows="3"
              />
            </form>
          </div>

          <div className="col-xs-2 pull-right">
          <div className="btn-group pull-right" role="group">
            <button onClick={() => this.toggleEditMode()} className="btn btn-xs btn-default"> Cancel </button>
          </div>
        </div>
        </div>

        <div className="row" id="comment-card">
        <div className="col-xs-2"> </div>
          <div className="col-xs-8">
            <div className="btn-toolbar" role="toolbar">
              <div className="btn-group mr-2" role="group">
                <button onClick={() => this.submitCommentUpdate()} className="btn btn-sm btn-primary"> Update </button>
              </div>
          </div>
          </div>


          <div className="col-xs-2 pull-right">
          <div className="btn-group pull-right" role="group">
            <button onClick={() => this.deleteComment()} className="btn btn-xs btn-danger"> Delete </button>
          </div>
        </div>



        </div>
        </div>
      );
    } else {
   return ( 
        <div className="row" id="comment-card">
            {this.CommentVotesBox()}
            {this.state.text}
            {this.commentActions()}
          </div>

          )
    }
  }
  render() {
    return (
      <div
        className="panel panel-primary"
        onClick={this.expandPanel.bind(this)}
      >
        <div className="panel-heading comment-panel">
          <h5 className="panel-title">
            {this.props.comment.user.username} says:
          </h5>
        </div>
        <div className="container-fluid" id="comment-card">
          {this.fullCommentView()}
        </div>
      </div>
    );
  }
}
module.exports = Comment;