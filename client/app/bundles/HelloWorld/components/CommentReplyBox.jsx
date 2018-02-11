// https://www.npmjs.com/package/google-maps-react
import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from 'classnames';


export class CommentReplyBox extends Component {
    constructor(props) {
    super(props);
    this.state = {
      formError: false
    };
  }
  static propTypes = {
    eventId: PropTypes.number,
    refreshComments: PropTypes.func
  };
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    if (data.get("text") == "") {
      this.setState({formError: true})
      return;
    }

    $.ajax({
      url: "/comments",
      type: "POST",
      data: {
        event_id: data.get("event_id"),
        text: data.get("text")
      },
      success: function(data, b, c) {
        this.setState({formError: false})
        this.clearForm();
      }.bind(this),
      error: function() {
        this.setState({formError: true})
      }.bind(this)
    });
  }
  clearForm() {
    this.textInput.value = "";
    this.props.refreshComments();
    this.textInput.focus();
  }
  render() {
      const textAreaClasses = classNames({
        "form-group": true,
        "has-error": this.state.formError
     });
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)} name="comment-form">
          <div className={textAreaClasses}>
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