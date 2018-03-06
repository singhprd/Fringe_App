// https://www.npmjs.com/package/google-maps-react
import React, { Component } from "react";
import PropTypes from "prop-types";
import Review from "./Review.jsx";

export class ReviewPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: "",
			reviews: []
			// showAll: false,
		};
	}
	static propTypes = {
		eventId: PropTypes.number
	};
	componentDidMount() {
		this.getReviews();
	}
	getReviews() {
		var reviews = [];
			this.props.get_reviews.map(function(review, index){
			reviews.push(<Review review={review} key={review.url} />);
		});
		this.setState({reviews: reviews});
	}
	getContent() {
		return {__html: this.state.data.content};
	};
	render() {
		return (
			<div>
				{this.state.reviews}
			</div>
		);
	}
}
module.exports = ReviewPanel;