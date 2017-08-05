import React, { Component } from 'react';
import PropTypes from 'prop-types';
var moment = require('moment');

export class PerformancesPanel extends Component {
  static propTypes = {
    eventId: PropTypes.number.isRequired,
    wellContent: PropTypes.number.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      performances: ['loading'],
      hasData: false
    };
  }
  componentDidMount(){
    $('td').tooltip();
  }
  componentDidUpdate(){
    $('td').tooltip();
  }
  getPerformances(){
    this.props.wellContent(this.performancesTable());
    if (this.state.hasData === true) {
      return;
    }
    var promise = $.getJSON('/events/' + this.props.eventId + '/performances');

    promise.done(function(data) {
      this.setState({performances: data, hasData: true});
      this.props.wellContent(this.performancesTable());
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
    // The Fringe API Guidence says that events finishing between
    // midnight and 5am should be listed as being on the previous day.
    // Correctly formatted date: Saturday 14th August.
    var dateOptions = ('dddd Do MMMM YYYY');
    var timeOptions = 'HH:mm';
    var startDate = moment(startDateString, 'YYYY-MM-DD HH-mm-ss');
    var endDate = moment(endDateString, 'YYYY-MM-DD HH-mm-ss');
    var hour = startDate.hour();
    var message = '';
    if (hour >= 0 && hour < 6 && this.props.isFringe == true) {
      startDate.subtract(1, 'days');
      message = 'The Fringe day runs from 06:00 to 05:59, and events that start in the early hours of the morning are listed as though they are on the day before.';
    }
    return(
      [
        <td key='date' data-toggle='tooltip' data-placement='bottom' title={message} data-container='body'> {startDate.format(dateOptions)} </td>,
        <td key='startDate'> {startDate.format(timeOptions)} </td>,
        <td key='endDate'> {endDate.format( timeOptions)} </td>
      ]
    );
  }
  performancesTable(){
    if (this.state.hasData === false) {
      return(
        <table className='table table-condensed'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Loading...</td>
            </tr>
          </tbody>
        </table>
      );
    }
    var performances = this.state.performances;
    performances = performances.map( function(perf, index){
      return (<tr key={index}>
        { this.fringeDates(perf.start_time, perf.end_time)	}
      </tr>);
    }.bind(this));
    return(
      <table className='table table-condensed'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {performances}
        </tbody>
      </table>
    );
  }
  render() {
    return (
      <button onClick={this.getPerformances.bind(this)} className='btn btn-default' type='button' data-toggle='collapse' data-target={'#performances_for_event' + this.props.eventId} aria-expanded='false' aria-controls={'performances_for_event' + this.props.eventId}>
			🗓️
      </button>
    );
  }
}

module.exports = PerformancesPanel;
// <th>Price</th>
// <th>Concession</th>


// <div className='collapse' id={'performances_for_event' + this.props.eventId}>

// <div className='well well-sm'>
// <table className='table table-condensed'>
// 	<thead>
// 		<tr>
// 			<th>Date</th>
// 			<th>Start Time</th>
// 			<th>End Time</th>
// 		</tr>
// 	</thead>
// 	<tbody>
// 		{this.performancesTable()}
// 	</tbody>
// </table>
// </div>
// </div>
// </div>
