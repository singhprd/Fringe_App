import React, { Component } from 'react';

export class ImageCarousel extends Component {
	render() {
		return (
<div id="myCarousel" className="carousel slide" data-ride="carousel">

  <ol className="carousel-indicators">
    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
    <li data-target="#myCarousel" data-slide-to="1"></li>
    <li data-target="#myCarousel" data-slide-to="2"></li>
  </ol>


  <div className="carousel-inner">
    <div className="item active">
      <img src="https://edfestimages.s3.amazonaws.com/fe/71/12/fe7112a12e9b7951ff059e7317744f85682e377c-original." alt="Los Angeles"/>
    </div>

    <div className="item">
      <img src="https://edfestimages.s3.amazonaws.com/fe/71/12/fe7112a12e9b7951ff059e7317744f85682e377c-original." alt="Chicago"/>
    </div>

    <div className="item">
      <img src="https://edfestimages.s3.amazonaws.com/fe/71/12/fe7112a12e9b7951ff059e7317744f85682e377c-original." alt="New York"/>
    </div>
  </div>


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