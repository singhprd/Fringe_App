import React, { Component } from 'react';
var classNames = require('classnames');

export class ImageCarousel extends Component {
  items() {
    return (
      this.props.imageUrls.map((url, index) => (
        <div className={classNames( 'item', { active: index===0 })} key={index}>
          <img src={url} alt={index}/>
        </div>
        ))
      );
  }
  render() {
    return (
      <div id="myCarousel" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
              {this.items()}
          </div>
          <ol className="carousel-indicators">
              <li data-target="#myCarousel" data-slide-to="0" className="active"/>
              <li data-target="#myCarousel" data-slide-to="1"/>
              <li data-target="#myCarousel" data-slide-to="2"/>
          </ol>
          <a className="left carousel-control" href="#myCarousel" data-slide="prev">
              <span className="glyphicon glyphicon-chevron-left"></span>
              <span className="sr-only">Previous</span>
          </a>
          <a className="right carousel-control" href="#myCarousel" data-slide="next">
              <span className="glyphicon glyphicon-chevron-right"></span>
              <span className="sr-only">Next</span>
          </a>
      </div>
      );
  }
}

module.exports = ImageCarousel;
