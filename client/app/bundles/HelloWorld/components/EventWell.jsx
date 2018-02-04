import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, DropdownButton, MenuItem, ButtonToolbar, Collapse } from 'react-bootstrap';

export class EventWell extends Component {
  static propTypes = {
    open: PropTypes.bool,
    content: PropTypes.element,
  };
  render() {
    return (
        <Collapse in={this.props.open}>
            <div className='' id={'performances_for_event'}>
              <div className='well well-sm' id="well-content-box">
                {this.props.content}
              </div>
            </div>
          </Collapse>
    );
  }
}

module.exports = EventWell;
