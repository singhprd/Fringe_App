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
  render() {
    return (
      <div className="col-2">
        ⬆️
        0
        ⬇️
      </div>
    );
  }
}
module.exports = CommentVotesBox;