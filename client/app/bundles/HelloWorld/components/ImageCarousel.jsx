import React, { Component } from 'react';
var classNames = require('classnames');

export class ImageCarousel extends Component {
  items() {
    if (typeof this.props.imageUrls === 'undefined' || this.props.imageUrls.length === 0) {
      return(
          <div className="item active">
          <img src="https://avatars2.githubusercontent.com/u/24581854?v=3&s=88" alt="1234"/>
        </div>
        );
    } else {
      return (
      this.props.imageUrls.map((url, index) => (
        <div className={classNames( 'item', { active: index === 0 })} key={index}>
          <img src={url} alt={index}/>
        </div>
        ))
      );
    }
  }
  render() {
    return (
      <div id="myCarousel" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
              {this.items()}
          </div>

      </div>
      );
  }
}

module.exports = ImageCarousel;

          // <a className="left carousel-control" href="#myCarousel" data-slide="prev">
          //     <span className="glyphicon glyphicon-chevron-left"></span>
          //     <span className="sr-only">Previous</span>
          // </a>
          // <a className="right carousel-control" href="#myCarousel" data-slide="next">
          //     <span className="glyphicon glyphicon-chevron-right"></span>
          //     <span className="sr-only">Next</span>
          // </a>

          // <ol className="carousel-indicators">
          //     <li data-target="#myCarousel" data-slide-to="0" className="active"/>
          //     <li data-target="#myCarousel" data-slide-to="1"/>
          //     <li data-target="#myCarousel" data-slide-to="2"/>
          // </ol>