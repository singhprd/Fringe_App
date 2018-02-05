import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, DropdownButton, MenuItem, ButtonToolbar, Collapse } from 'react-bootstrap';

export class EventWell extends Component {
  static propTypes = {
    open: PropTypes.bool,
    content: PropTypes.element,
    eventId: PropTypes.number,
  };
  render() {
    return (
        <Collapse in={this.props.open}>
          <div className='well well-sm' id="well-content-box">
            {this.props.content}
          </div>
        </Collapse>
    );
  }
}

module.exports = EventWell;
