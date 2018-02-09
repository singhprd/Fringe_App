// https://www.npmjs.com/package/google-maps-react
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class CommentReplyBox extends Component {
  handleSubmit(event) {
    console.log(event)
    event.preventDefault();
    const data = new FormData(event.target);
    data.append('username', 'Chris');


    console.log(data)
    
    fetch('/comments', {
      method: 'POST',
      body: data,
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
    }
  render() {
    return (
        <div>
            <form onSubmit={this.handleSubmit} name="comment-form">
                <div className="form-group">
                    <textarea name="text" className="form-control" rows="3"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Comment</button>
            </form>
        </div>
      );
  }
}
module.exports = CommentReplyBox;