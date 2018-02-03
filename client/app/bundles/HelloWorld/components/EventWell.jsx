import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, DropdownButton, MenuItem, ButtonToolbar, Collapse } from 'react-bootstrap';

export class EventWell extends Component {
  static propTypes = {
    // eventIds: PropTypes.array,
    // userSignedIn: PropTypes.bool,
  };
  render() {
    return (
        <Collapse in={true}>
            <div className='' id={'performances_for_event'}>
              <div className='well well-sm' id="well-content-box">
                hello
              </div>
            </div>
          </Collapse>
    );
  }
}

module.exports = EventWell;
