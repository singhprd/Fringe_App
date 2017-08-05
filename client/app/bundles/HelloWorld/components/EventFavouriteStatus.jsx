import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class EventFavouriteStatus extends Component {
  static propTypes = {
    eventId: PropTypes.number.isRequired,
    isFavourited: PropTypes.bool,
    unfavourite: PropTypes.func.isRequired,
    favourite: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {isFavourited: this.props.isFavourited};
  }
  // isFavourited(){
  //   // var that = this;
  //   $.ajax({
  //     url: '/events/' + this.props.eventId + '/is_favourited',
  //     type: 'GET',
  //     data: {event_id: this.props.eventId},
  //     success: function(a,b,c){
  //       this.setState({isFavourited: a.bool});
  //       // $("#notice").html(a['notice'])
  //     }.bind(this),
  //     error: function() {
  //       console.log('failed isFavourited user_event_status.jsx');
  //     }
  //   });
  // }
  favourite() {
    this.props.favourite(this.props.eventId);
  }
  unfavourite() {
    this.props.unfavourite(this.props.eventId);
  }
  renderAppropriateButtons(){
    if (this.props.isFavourited) {
      return <button onClick={this.unfavourite.bind(this)} className="btn btn-default active">❤️️</button>;
    } else {
      return <button onClick={this.favourite.bind(this)} className="btn btn-default">❤️️</button>;
    }
  }
  render() {
    return (
      this.renderAppropriateButtons()
    );
  }
}

module.exports = EventFavouriteStatus;
