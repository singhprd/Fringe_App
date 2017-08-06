import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventCard from './EventCard.jsx';

export class EventCardContainer extends Component {
  static propTypes = {
    eventIds: PropTypes.array,
    userSignedIn: PropTypes.bool,
  };
  eventCards(){
    return this.props.eventIds.map(function(id){
      return(<EventCard key={'event-card-key-' + id} eventId={id} userSignedIn={this.props.userSignedIn}/>);
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
