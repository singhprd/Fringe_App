// https://www.npmjs.com/package/google-maps-react
import React, { Component } from 'react';
import Comment from './Comment.jsx';
import CommentReplyBox from './CommentReplyBox.jsx';
import PropTypes from 'prop-types';

export class CommentsPanel extends Component {
  render() {
    return (
      <div>
        <h4>What did you think?</h4>
        <Comment/>
        <CommentReplyBox/>
      </div>
      );
  }
}
module.exports = CommentsPanel;