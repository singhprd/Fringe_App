// https://www.npmjs.com/package/google-maps-react
import React, { Component } from "react";
import PropTypes from "prop-types";

export class Review extends Component {
    constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }
  static propTypes = {
    review: PropTypes.object
    // username: PropTypes.string
  };
  createContentMarkup() {
    console.warn(this.props.review);
    return {__html: this.props.review.content};
  }
  shortSearchContent() {
    // var searchEngineContent = JSON.parse(this.props.review.search_engine_content);
    // return searchEngineContent.
    var result = this.props.review.search_engine_content;
    result = JSON.parse(result);
  }
  render() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading comment-panel">
          <h5 className="panel-title">{this.props.review.title}</h5>
        </div>
        <div className="container-fluid" id="comment-card">
          <div className="row"  id="comment-card">
            <div>
              <div dangerouslySetInnerHTML={this.createContentMarkup()} />
              <a href={this.props.review.url}>Read more >></a>
            </div>
          </div>  
        </div>
      </div>
    );
  }
}
module.exports = Review;
