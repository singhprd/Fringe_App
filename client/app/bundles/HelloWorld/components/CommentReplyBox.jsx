// https://www.npmjs.com/package/google-maps-react
import React, { Component } from "react";
import PropTypes from "prop-types";

export class CommentReplyBox extends Component {
  static propTypes = {
    eventId: PropTypes.number,
    refreshComments: PropTypes.func
  };
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    $.ajax({
      url: "/comments",
      type: "POST",
      data: {
        event_id: data.get("event_id"),
        text: data.get("text")
      },
      success: function(data, b, c) {
        this.clearForm();
      }.bind(this),
      error: function() {
        console.log("failed");
      }
    });
  }
  clearForm() {
    this.textInput.value = "";
    this.props.refreshComments();
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)} name="comment-form">
          <div className="form-group">
            <textarea
              ref={input => {
                this.textInput = input;
              }}
              name="text"
              className="form-control"
              rows="3"
            />
            <input type="hidden" name="event_id" value={this.props.eventId} />
          </div>
          <button type="submit" className="btn btn-primary">
            Comment
          </button>
        </form>
      </div>
    );
  }
}
module.exports = CommentReplyBox;