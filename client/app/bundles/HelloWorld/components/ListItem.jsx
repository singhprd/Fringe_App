import React, { Component } from 'react';

export class ListItem extends Component {
  render() {
    return (
      <div>Position: {this.props.positon} ID: {this.props.valueId}</div>
    );
  }
}

module.exports = ListItem;