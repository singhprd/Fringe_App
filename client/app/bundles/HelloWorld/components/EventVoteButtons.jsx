import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class EventVoteButtons extends Component {
  static propTypes = {
    eventId: PropTypes.number.isRequired,
    voteToBeat: PropTypes.number,
    voteToStayAbove: PropTypes.number,
};
constructor(props) {
    super(props);
    this.state = { score: this.props.score };
}
shouldBumpUp() {
    if(this.props.voteToBeat === null) {
        return;
    }
    if (this.state.score > this.props.voteToBeat) {
        this.setState({score: "⬆️"});
        $('.vote_buttons').find('button').prop('disabled', true);
        location.reload();
    }
}
shouldBumpDown() {
    if(this.props.voteToStayAbove === null) {
        return;
    }
    if (this.state.score < this.props.voteToStayAbove) {
        this.setState({score: "⬇️"});
        $('.vote_buttons').find('button').prop('disabled', true);
        location.reload();
    }
}
getVotes() {
    $.ajax({
        url: '/events/1/votes',
        type: 'GET',
        data: {event_id: '1'},
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
        // this.setState({ score: this.state.score + 1 });
        $.ajax({
            url: '/votes',
            type: 'POST',
            data: { event_id: this.props.eventId, value: 1 },
            success: function(a, b, c) {
                // console.log("a", a, "b",b, "c", c)
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
        // this.getVotes()
    }
    downvote() {
        // this.setState({ score: this.state.score - 1 });
        $.ajax({
            url: '/votes',
            type: 'POST',
            data: { event_id: this.props.eventId, value: -1 },
            success: function(a, b, c) {
                // console.log("a", a, "b",b, "c", c)
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
<div className="btn-group">
    <div className="vote_buttons btn-group" role="group">
        <button onClick={this.upvote.bind(this)} className="btn btn-default">
            👍
        </button>
        <button className="btn btn-default disabled">
            {this.state.score}
        </button>
        <button onClick={this.downvote.bind(this)} className="btn btn-default">
            👎
        </button>
    </div>
</div>
            );
    }
}

module.exports = EventVoteButtons;
