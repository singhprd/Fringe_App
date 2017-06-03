import React, { Component } from 'react';

export class PerformancesPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {performances: []};
  }
  componentDidMount(){
		$("button").one("mouseenter", function(e){
			this.get_performances();
		}.bind(this));
  }
	get_performances(){
		var promise = $.getJSON('/events/'+this.props.event_id+'/performances');

		promise.done(function(data) {
			console.log(data)
			this.setState({performances: data})
		}.bind(this));
	}
	performances_panel(){
		var performances = this.state.performances
		var options = { year: '2-digit', month: 'long', day: 'numeric', hour12: true, hour: 'numeric', minute: 'numeric' };
		return performances.map( function(perf, index){
			return(
				<tr key={index}>
					<td>{ new Date(perf.start_time).toLocaleString('en-GB', options)	}</td>
					<td>{ new Date(perf.start_time).toLocaleString('en-GB', options)	}</td>
					<td>£{	perf.price 						}</td>
					<td>£{	perf.concession 				}</td>
				</tr>
			)
		});
	}
	render() {
		return (
			<div>

			<button className="btn btn-default" type="button" data-toggle="collapse" data-target={"#performances_for_event"+this.props.event_id} aria-expanded="false" aria-controls={"performances_for_event" + this.props.event_id}>
			🗓️
			</button>

			<div className="collapse" id={"performances_for_event" + this.props.event_id}>
			<div className="well">
			<table className="table table-condensed">
    		<thead>
	    		<tr>
		    		<th>Start Time</th>
		    		<th>End Time</th>
		    		<th>Price</th>
		    		<th>Concession</th>
	    		</tr>
	    	</thead>
    	  <tbody>
					{this.performances_panel()}
    		</tbody>
	    </table>
			</div>
			</div>
			</div>
			);
	}
}

module.exports = PerformancesPanel;
