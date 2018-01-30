import React, { Component } from "react";
import { render } from "react-dom";
import EventCard from "./EventCard.jsx";
import ListItem from "./ListItem.jsx";
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from "react-sortable-hoc";
import PropTypes from "prop-types";

const SortableItem = SortableElement(({ value }) => <div>{value}</div>);

const SortableList = SortableContainer(({ items }) => {
  return (
    <div>
      {items.map((value, index) => (
        <SortableItem
          key={`item-${index}`}
          sortIndex={value.props.positon}
          index={index}
          value={value}
        />
      ))}
    </div>
  );
});

class List extends Component {
  static propTypes = {
    events: PropTypes.array,
    userSignedIn: PropTypes.bool,
    isFavourited: PropTypes.bool,
    imageUrls: PropTypes.array,
    voteToBeat: PropTypes.number,
    voteToStayAbove: PropTypes.number,
    listItems: PropTypes.array,
    listId: PropTypes.number
  };
  state = {
    items: this.listEventCardItems()
  };
  componentDidMount(){
    console.log(this.state)
  }
  getEvent(id) {
    var events = this.props.events.filter(function(event) {
      var event = JSON.parse(event);
      return event.id === id;
    });
    return JSON.parse(events[0]);
  }
  listEventCardItems() {
    var items = this.props.listItems.map(
      function(item, index, arr) {
        var eventJson = this.getEvent(item.event_id);

        return (
          <EventCard
            userSignedIn
            key={item.event_id}
            eventId={item.event_id}
            short={true}
            positon={item.position}
            eventJson={eventJson}
          />
        );
      }.bind(this)
    );
    return items.sort(function(a, b) {
      return a.props.positon - b.props.positon;
    });
  }
  swapPositon(oldIndex, newIndex, listId) {
    oldIndex = oldIndex + 1;
    newIndex = newIndex + 1;

    $.ajax({
      type: "POST",
      url: "/lists/swap_items",
      data: { oldIndex: oldIndex, newIndex: newIndex, listId: listId }
    });
  }
  onSortEnd = ({ oldIndex, newIndex, collection }) => {
    this.swapPositon(oldIndex, newIndex, this.props.listId);
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex)
    });
  };
  handleShouldCancelStart(e){
    if (e.path[0].tagName.toLowerCase() === 'a'){
      return true;
    } else {
      return false;
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-8">
            <SortableList items={this.state.items} onSortEnd={this.onSortEnd} shouldCancelStart={this.handleShouldCancelStart}/>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = List;
