import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, DropdownButton, MenuItem, ButtonToolbar, Collapse, Clearfix } from 'react-bootstrap';

export class ListPanel extends Component {
  static propTypes = {
    eventId: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.state = {
      lists: [{'name': 'nil', 'event_ids': []}],
      openDropdown: false,
      hasData: false
    };
  }
  componentDidMount(){
    this.fetchLists();
  }
  fetchLists(){
    var promise = $.getJSON('/lists');
    promise.done(function(data) {
      this.setState({lists: data, hasData: true});
    }.bind(this));
  }
  addToListMenuItems = () => {
    var items = this.state.lists.map(function(list, index){
      if (!list.event_ids.includes(this.props.eventId)) {
        return(
          <MenuItem key={'add-menu-item' + index} eventKey={index} id={list.id} onClick={()=>this.addToList(list.id)}>{list.name}</MenuItem>
        );
      }
    }.bind(this));
    items = this.cleanArray(items);
    if (items.length >= 1) {
      return(
        [<MenuItem key="add-to-list" header>Add To List</MenuItem>, items, <MenuItem  key="add-to-list-divider" divider />]
      );}
  }
  cleanArray(items){
    return $.grep(items,function(n){ return n === 0 || n; });
  }
  removeFromListMenuItems = () => {
    var items = this.state.lists.map(function(list, index){
      if (list.event_ids.includes(this.props.eventId)) {
        return(
          <MenuItem key={'remove-menu-item' + index} eventKey={index} id={list.id} onClick={()=>this.removeFromList(list.id)}>{list.name}</MenuItem>
        );
      }
    }.bind(this));
    items = this.cleanArray(items);
    if (items.length >= 1) {
      return(
        [<MenuItem key="remove-from-list" header>Remove from list</MenuItem>, items, <MenuItem  key="remove-from-divider" divider />]
      );}
  }
  addToList(listId){
    $.ajax({
      url: '/lists/create_item',
      type: 'POST',
      data: {
        list_id: listId,
        event_id: this.props.eventId
      },
      success: function(data, b, c) {
        this.fetchLists();
      }.bind(this),
      error: function() {
        console.log('failed');
      }
    });
  }
  removeFromList(listId){
    $.ajax({
      url: '/lists/destroy_item',
      type: 'POST',
      data: {
        list_id: listId,
        event_id: this.props.eventId
      },
      success: function(data, b, c) {
        this.fetchLists();
      }.bind(this),
      error: function() {
        console.log('failed');
      }
    });
  }
  createList(){
    Turbolinks.visit('/lists/new');
  }
  listMenuItems(){
    if (this.state.hasData) {
      var addItems = this.addToListMenuItems();
      var removeItems = this.removeFromListMenuItems();
      return(
        [addItems, removeItems]
      );
    } else {
      return(<h1>Loading Your Lists</h1>);
    }
  }
  dropDownText(){
    if (this.state.openDropdown === false) {
      return 'Lists';
    } else {
      return 'Close';
    }
  }
  handleDropdownClick = (content) => {
    this.setState({openDropdown: !this.state.openDropdown});
  }
  handleToggle(e, obj){
  }
  render() {
    return (
      <DropdownButton pullRight title={this.dropDownText()} id="dropdown-size-medium" open={this.state.openDropdown} onToggle={this.handleToggle} onClick={this.handleDropdownClick} defaultOpen={false} >
        {this.listMenuItems()}
        <MenuItem eventKey="1" id="213" onClick={()=>this.createList()}>Create List</MenuItem>
      </DropdownButton>
    );
  }
}

module.exports = ListPanel;
