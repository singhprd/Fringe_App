import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class EventFavouriteStatus extends Component {
  static propTypes = {
    // eventId: PropTypes.number.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {isFavourited: this.props.isFavourited};
  }
  isFavourited(){
    var that = this;
    $.ajax({
      url: '/events/' + this.props.eventId + '/is_favourited',
      type: 'GET',
      data: {event_id: this.props.eventId},
      success: function(a,b,c){
        this.setState({isFavourited: a.bool});
        // $("#notice").html(a['notice'])
      }.bind(this),
      error: function() {
        console.log('failed isFavourited user_event_status.jsx');
      }
    });
  }
  renderAppropriateButtons(){
    if (this.props.isFavourited) {
      return <button onClick={this.props.unfavourite} className="btn btn-default active">❤️️</button>;
    } else {
      return <button onClick={this.props.favourite} className="btn btn-default">❤️️</button>;
    }
  }
  render() {
    return (
      <div className="btn-group" role="group">
        {this.renderAppropriateButtons()}
      </div>
      );
  }
}

module.exports = EventFavouriteStatus;
