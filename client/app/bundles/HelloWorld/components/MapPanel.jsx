import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class MapPanel extends Component {
  static propTypes = {
    // eventId: PropTypes.number,
  };
  constructor(props) {
    super(props);
    // this.state = {
    //   performances: ['loading'],
    //   hasData: false,
    //   open: false
    // };
  }
  componentDidMount(){
      // this.getPerformances();
    // $('td').tooltip();
  }
  componentDidUpdate(){
    // $('td').tooltip();
  }
  render() {
    return (
      <h1>Map!</h1>
    );
  }
}

module.exports = MapPanel;
