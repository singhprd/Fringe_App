import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class PerformancesPanel extends Component {
  static propTypes = {
    eventId: PropTypes.number.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {performances: ['loading'], hasData: false};
  }
  componentDidMount(){
		$('td').tooltip();
  }
  componentDidUpdate(){
		// $('button').one('mouseenter', function(e){
		// 	this.getPerformances();
		// }.bind(this));
		$('td').tooltip();
  }
	getPerformances(){
		if (this.state.hasData === true) {
			return;
		}
		var promise = $.getJSON('/events/' + this.props.eventId + '/performances');

		promise.done(function(data) {
			this.setState({performances: data, hasData: true});
		}.bind(this));
	}
	fringePrice(price){
		var num = parseFloat(price);
		if (isNaN(num)) {
			return '-';
		} else {
			return '£' + num;
		}
	}
	fringeDates(startDateString, endDateString){
		// The Fringe API Guidence says that events finishing between midnight and 5am should be listed as being on the previous day.
		// Saturday 14th August.
		var dateOptions = { weekday: 'short', year: '2-digit', month: 'long', day: 'numeric' };
		var timeOptions = { hour12: false, hour: 'numeric', minute: 'numeric' };
		var startDate = new Date(startDateString);
		var endDate = new Date(endDateString);
		var hour = endDate.getHours();
		var message = '';
		if (hour >= 0 && hour < 5 ) {
			startDate.setDate(startDate.getDate() - 1);
			message = 'The Fringe day runs from 06:00 to 05:59, and events that start in the early hours of the morning are listed as though they are on the day before.';
		}
		return(
			[
			<td key='date' ref='test' data-toggle='tooltip' data-placement='bottom' title={message} data-container='body'> {startDate.toLocaleString('en-GB', dateOptions)} </td>,
			<td key='startDate'> {startDate.toLocaleString('en-GB', timeOptions)} </td>,
			<td key='endDate'> {endDate.toLocaleString('en-GB', timeOptions)} </td>
			]
				);
	}
	performancesTable(){
		if (this.state.hasData === false) {
			return(
				<tr>
					<td className='loading'>loading</td>
				</tr>
				);
		}
		var performances = this.state.performances;
		return performances.map( function(perf, index){
			return(
				<tr key={index}>
					{ this.fringeDates(perf.start_time, perf.end_time)	}
				<td>{	this.fringePrice(perf.price, index) 						}</td>
				<td>{	this.fringePrice(perf.concession, index) 				}</td>
				</tr>
			);
		}.bind(this));
	}
	render() {
		return (
			<div>
			<button onClick={this.getPerformances.bind(this)} className='btn btn-default' type='button' data-toggle='collapse' data-target={'#performances_for_event' + this.props.eventId} aria-expanded='false' aria-controls={'performances_for_event' + this.props.eventId}>
			🗓️
			</button>

			<div className='collapse' id={'performances_for_event' + this.props.eventId}>

			<div className='well well-sm'>
			<table className='table table-condensed'>
				<thead>
					<tr>
						<th>Date</th>
						<th>Start Time</th>
						<th>End Time</th>
						<th>Price</th>
						<th>Concession</th>
					</tr>
				</thead>
				<tbody>
					{this.performancesTable()}
				</tbody>
			</table>
			</div>
			</div>
			</div>
			);
	}
}

module.exports = PerformancesPanel;
