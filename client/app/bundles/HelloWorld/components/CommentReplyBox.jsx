// https://www.npmjs.com/package/google-maps-react
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class CommentReplyBox extends Component {
  static propTypes = {
    eventId: PropTypes.number,
  };
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    $.ajax({
      url: '/comments',
      type: 'POST',
      data: {
        event_id: data.get("event_id"),
        text: data.get("text")
      },
      success: function(data, b, c) {
        console.log(data)
      }.bind(this),
      error: function() {
        console.log('failed');
      }
    });
    
    // fetch('/comments', {
    //   method: 'POST',
    //   body: data,
    //   credentials: 'same-origin',
    //   // headers: {
    //   //   'Content-Type': 'application/json'
    //   // },
    // }).then(res => res.json())
    //     .catch(error => console.error('Error:', error))
    //     .then(response => console.log('Success:', response));
    }
  render() {
    return (
        <div>
            <form onSubmit={this.handleSubmit} name="comment-form">
                <div className="form-group">
                    <textarea name="text" className="form-control" rows="3"></textarea>
                    <input type="hidden" name="event_id" value={this.props.eventId} />
                </div>
                <button type="submit" className="btn btn-primary">Comment</button>
            </form>
        </div>
      );
  }
}
module.exports = CommentReplyBox;