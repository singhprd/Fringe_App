import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventCard from './EventCard.jsx';

export class EventCardContainer extends Component {
  static propTypes = {
    eventIds: PropTypes.array,
    userSignedIn: PropTypes.bool,
  };
  eventCards(){
    return this.props.eventJson.map(function(event){
      var eventJson = JSON.parse(event);
      return(<EventCard key={'event-card-key-' + eventJson.id} eventId={eventJson.id} userSignedIn={this.props.userSignedIn} eventJson={eventJson}/>);
    }.bind(this));
  }
  render() {
    var eventCards = this.eventCards();
    return (
      <div>
        {eventCards}
      </div>
    );
  }
}

module.exports = EventCardContainer;
