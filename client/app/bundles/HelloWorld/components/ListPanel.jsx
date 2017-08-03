import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Button, ButtonGroup, DropdownButton, MenuItem, ButtonToolbar, Collapse, Clearfix } from 'react-bootstrap';

export class ListPanel extends Component {
  static propTypes = {
    // eventId: PropTypes.number.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      lists: [{'name': "nil", "event_ids": []}],
      openDropdown: false
    };
  }
  componentDidMount(){
    this.fetchLists();
  }
  fetchLists(){
    var promise = $.getJSON('/lists');
    promise.done(function(data) {
      this.setState({lists: data});
    }.bind(this));
  }
  addToListMenuItems = () => {
    return this.state.lists.map(function(list, index){
      if (!list.event_ids.includes(this.props.eventId)) {
        return(
          <MenuItem eventKey={index} id={list.id} onClick={()=>this.addToList(list.id)}>{list.name}</MenuItem>
        );
      }
    }.bind(this));
  }
  removeFromListMenuItems = () => {
    return this.state.lists.map(function(list, index){
      if (list.event_ids.includes(this.props.eventId)) {
        return(
          <MenuItem eventKey={index} id={list.id} onClick={()=>this.removeFromList(list.id)}>{list.name}</MenuItem>
        );
      }
    }.bind(this));
  }
  addToList(list_id){
    var event_id = this.props.eventId;
    console.log(event_id);
    $.ajax({
        url: '/lists/create_item',
        type: 'POST',
        data: { list_id: list_id, event_id: event_id },
        success: function(data, b, c) {
            this.fetchLists();
        }.bind(this),
        error: function() {
            console.log('failed');
        }
    });
  }
  removeFromList(list_id){
    var event_id = this.props.eventId;
    console.log(event_id);
    $.ajax({
        url: '/lists/destroy_item',
        type: 'POST',
        data: { list_id: list_id, event_id: event_id },
        success: function(data, b, c) {
            this.fetchLists();
        }.bind(this),
        error: function() {
            console.log('failed');
        }
    });
  }
  handleDropdownClick = (content) => {
    this.setState({openDropdown: !this.state.openDropdown});
  }
  render() {
    return (
      <DropdownButton pullRight title="Lists" id="dropdown-size-medium" onClick={this.handleDropdownClick} open={this.state.openDropdown}>
        <MenuItem header>Add To List</MenuItem>
        {this.addToListMenuItems()}

        <MenuItem divider />
        <MenuItem header>Remove from list</MenuItem>
        {this.removeFromListMenuItems()}
      </DropdownButton>
      );
  }
}

module.exports = ListPanel;
