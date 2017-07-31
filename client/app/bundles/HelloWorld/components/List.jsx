import React, {Component} from 'react';
import {render} from 'react-dom';
import EventCard from './EventCard.jsx';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import PropTypes from 'prop-types';

const SortableItem = SortableElement(({value}) =>
  <div>{value}</div>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <div>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
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
  };
  state = {
    items: this.eventCards(),
  };
  eventCards(){
      var userSignedIn = this.props.userSignedIn;
      return this.props.events.map(function(currentValue, index, arr){
        return <EventCard key={index} event={currentValue} venue={false} userSignedIn={userSignedIn} short={true}/>;
      });
  }
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  };
  render() {
    console.log(this.eventCards())
    return(
      <div>
      <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
      </div>
      );
  }
};

module.exports = List;