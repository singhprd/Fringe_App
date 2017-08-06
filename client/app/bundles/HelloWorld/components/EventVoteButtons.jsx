import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';

export class EventVoteButtons extends Component {
  static propTypes = {
    eventId: PropTypes.number.isRequired,
    voteToBeat: PropTypes.number,
    voteToStayAbove: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.state = {
      score: 0
    };
    this.getVotes();
  }
  isSearch() {
    return (window.location.pathname === '/search/results');
  }
  shouldBumpUp() {
    if((this.props.voteToBeat === null) || this.isSearch()) {
      return;
    }
    if (this.state.score > this.props.voteToBeat) {
      this.setState({score: '⬆️'});
      $('.vote_buttons').find('button').prop('disabled', true);
      location.reload();
    }
  }
  shouldBumpDown() {
    if((this.props.voteToStayAbove === null) || this.isSearch()) {
      return;
    }
    if (this.state.score < this.props.voteToStayAbove) {
      this.setState({score: '⬇️'});
      $('.vote_buttons').find('button').prop('disabled', true);
      location.reload();
    }
  }
  getVotes() {
    $.ajax({
      url: '/events/' + this.props.eventId + '/votes',
      type: 'GET',
      data: {id: this.props.eventId},
      success: function(a, b, c) {
        var votes = a.votes;
        this.setState({ score: a.votes });
        $('#notice').html(a.notice);
      }.bind(this),
      error: function() {
        console.log('failed');
      }
    });
  }
  upvote() {
    $.ajax({
      url: '/votes',
      type: 'POST',
      data: { event_id: this.props.eventId, value: 1 },
      success: function(a, b, c) {
        var votes = a.votes;
        if (votes) {
          this.setState({ score: a.votes });
          this.shouldBumpUp();
        }
        $('#notice').html(a.notice);
      }.bind(this),
      error: function() {
        console.log('failed');
      }
    });
  }
  downvote() {
    $.ajax({
      url: '/votes',
      type: 'POST',
      data: { event_id: this.props.eventId, value: -1 },
      success: function(a, b, c) {
        var votes = a.votes;
        if (votes) {
          this.setState({ score: a.votes });
          this.shouldBumpDown();
        }
        $('#notice').html(a.notice);
      }.bind(this),
      error: function() {
        console.log('failed');
      }
    });
  }
  render() {
    return (
      <ButtonGroup>
        <button onClick={this.upvote.bind(this)} className="btn btn-default">
            👍
        </button>
        <button className="btn btn-default disabled">
          {this.state.score}
        </button>
        <button onClick={this.downvote.bind(this)} className="btn btn-default">
            👎
        </button>
      </ButtonGroup>
    );
  }
}

module.exports = EventVoteButtons;
