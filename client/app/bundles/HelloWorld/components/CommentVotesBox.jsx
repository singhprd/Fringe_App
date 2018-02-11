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
  topButton(){
    if (this.props.user_vote == "1") {
      return(
        <div>😊</div>
      )
    } else {
      return  (
        <div>⬆️</div>
        )
    }
  }
  bottomButton(){
    if (this.props.user_vote == "-1") {
      return(
        <div>😠</div>
      )
    } else {
      return  (
        <div>⬇️</div>
        )
    }
  }
  render() {
    return (
      <div className="col-2">
        {this.topButton()}
        <div>[{this.props.votes}]</div>
        {this.bottomButton()}
      </div>
    );
  }
}
module.exports = CommentVotesBox;