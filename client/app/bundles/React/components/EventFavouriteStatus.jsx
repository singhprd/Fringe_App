import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class EventFavouriteStatus extends Component {
  static propTypes = {
    eventId: PropTypes.number,
    isFavourited: PropTypes.bool,
    unfavourite: PropTypes.func,
    favourite: PropTypes.func,
  };
  constructor(props) {
    super(props);
  }
  favourite() {
    this.props.favourite(this.props.eventId);
  }
  unfavourite() {
    this.props.unfavourite(this.props.eventId);
  }
  renderAppropriateButtons(){
    if (this.props.isFavourited) {
      return <button onClick={this.unfavourite.bind(this)} className="btn btn-default active">❤️ </button>;
    } else {
      return <button onClick={this.favourite.bind(this)} className="btn btn-default">💙</button>;
    }
  }
  render() {
    return (
      this.renderAppropriateButtons()
    );
  }
}

module.exports = EventFavouriteStatus;
