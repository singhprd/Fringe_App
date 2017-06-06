import React, { Component } from 'react';
import ReactDom from 'react-dom'

export class PerformancesPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {performances: ["loading"], has_data: false};
  }
  componentDidMount(){
		$('td').tooltip();
  }
  componentDidUpdate(){
		// $("button").one("mouseenter", function(e){
		// 	this.getPerformances();
		// }.bind(this));
		$('td').tooltip();
  }
	getPerformances(){
		if (this.state.has_data === true) {
			return;
		}
		var promise = $.getJSON('/events/'+this.props.event_id+'/performances');

		promise.done(function(data) {
			this.setState({performances: data, has_data: true})
		}.bind(this));
	}
	fringe_price(price){
		var num = parseFloat(price)
		if (isNaN(num)) {
			return "-"
		} else {
			return "£" + num
		}
	}
	fringe_dates(start_date_string, end_date_string){
		// The Fringe API Guidence says that events finishing between midnight and 5am should be listed as being on the previous day.
		 // Saturday 14th August.
		var date_options = { weekday: 'short', year: '2-digit', month: 'long', day: 'numeric' };
		var time_options = { hour12: false, hour: 'numeric', minute: 'numeric' };
		var start_date = new Date(start_date_string)
		var end_date = new Date(end_date_string)
		var hour = start_date.getHours()
		var message = ""
		if (hour >= 0 && hour < 5 ) {
			start_date.setDate(start_date.getDate() - 1)
			message = "The Fringe day runs from 06:00 to 05:59, and events that start in the early hours of the morning are listed as though they are on the day before."
		}
		return(
			[
			<td key="date" ref="test" data-toggle="tooltip" data-placement="bottom" title={message} data-container="body"> {start_date.toLocaleString('en-GB', date_options)} </td>,
			<td key="start_time" ref="test" data-toggle="tooltip" data-placement="bottom" title={message} data-container="body"> {start_date.toLocaleString('en-GB', time_options)} </td>,
			<td key="end_time"  ref="test" data-toggle="tooltip" data-placement="bottom" title={message} data-container="body"> {end_date.toLocaleString('en-GB', time_options)} </td>
			]
				)
	}
	performances_table(){
		if (this.state.has_data === false) {
			return(
				<tr>
					<td className="loading">loading</td>
				</tr>
				)
		}
		var performances = this.state.performances
		return performances.map( function(perf, index){
			return(
				<tr key={index}>
					{ this.fringe_dates(perf.start_time, perf.end_time)	}
				<td>{	this.fringe_price(perf.price, index) 						}</td>
				<td>{	this.fringe_price(perf.concession, index) 				}</td>
				</tr>
			)
		}.bind(this));
	}
	render() {
		return (
			<div>
			<button onClick={this.getPerformances.bind(this)} className="btn btn-default" type="button" data-toggle="collapse" data-target={"#performances_for_event"+this.props.event_id} aria-expanded="false" aria-controls={"performances_for_event" + this.props.event_id}>
			🗓️
			</button>

			<div className="collapse" id={"performances_for_event" + this.props.event_id}>

			<div className="well well-sm">
			<table className="table table-condensed">
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
					{this.performances_table()}
				</tbody>
	    </table>
			</div>
			</div>
			</div>
			);
	}
}

module.exports = PerformancesPanel;
