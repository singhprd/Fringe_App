import React from 'react';
var EventVoteButtons = require('./EventVoteButtons.jsx');
var EventFavouriteStatus = require('./EventFavouriteStatus.jsx');
var PerformancesPanel = require('./PerformancesPanel.jsx');

// Entry point to React
var EventCard = React.createClass({
  getInitialState: function() {
    return {
      event: $.parseJSON(this.props.event),
      isFavourited: this.props.isFavourited
    };
  },
  signedIn: function(e, v) {
    if (this.props.userSignedIn) {
      return (
        <div className="btn-toolbar" role="toolbar">
          <EventVoteButtons score={e.score} eventId={e.id} />
          <EventFavouriteStatus favourite={this.favourite} unfavourite={this.unfavourite} isFavourited={this.state.isFavourited} eventId={e.id} />
          <PerformancesPanel performances={this.props.performances} eventId={this.state.event.id} />
        </div>
      );
    } else {
      return (
        <div className="btn-toolbar" role="toolbar">
          <EventVoteButtons score={e.score} eventId={e.id} />
          <a href="/users/sign_in" type="button" className="btn btn-default">
    Sign In To Vote
          </a>
        </div>
      );
    }
  },
  favourite: function(){
    // console.log("Faved")
    // Keen Bean Loading
    this.setState({isFavourited: true});
    // var that = this;
    $.ajax({
      url: '/favourites',
      type: 'POST',
      data: {favourite: {event_id: this.state.event.id}},
      success: function(a,b,c){
        this.isFavourited();
      }.bind(this),
      error: function() {
        console.log('failed favourite user_event_status.jsx');
      }
    });
  },

  unfavourite: function(){
    // console.log("Un-Faved")
    // Keen Bean Loading
    this.setState({isFavourited: false});
    // var that = this;
    $.ajax({
      url: '/favourites/' + this.state.event.id,
      type: 'DELETE',
      data: {favourite: {event_id: this.state.event.id}},
      success: function(a,b,c){
        // console.log(a,b,c)
        this.isFavourited();
      }.bind(this),
      error: function() {
        console.log('failed unfavourite user_event_status.jsx');
      }
    });
  },
  isFavourited: function(){
    // var that = this;
    $.ajax({
      url: '/events/' + this.state.event.id + '/is_favourited',
      type: 'GET',
      data: {event_id: this.state.event.id},
      success: function(a,b,c){
        this.setState({isFavourited: a.bool});
        // $("#notice").html(a['notice'])
        console.log('isFavourited' + a.bool);

      }.bind(this),
      error: function() {
        console.log('failed isFavourited user_event_status.jsx');
      }
    });
  },
  checkIsFavourited: function(){
    $('[data-toggle="tooltip"]').tooltip();
    // var that = this;
    $.ajax({
      url: '/events/' + this.state.event.id + '/is_favourited',
      type: 'GET',
      data: {event_id: this.state.event.id},
      success: function(a,b,c){
        if (a.bool) {
          this.setState({isFavourited: 'favourite'});
        }
      }.bind(this),
      error: function() {
        console.log('failed isFavourited user_event_status.jsx');
      }
    });
  },
  render: function() {
    const e = this.state.event;
    const v = $.parseJSON(this.props.venue);
    const imageUrls = this.props.imageUrls;
    return (
      <div
        className="panel panel-primary home_card text-info"
        id={this.state.id}
      >
        <div className={'panel-heading ' + (this.state.isFavourited ? 'favourite' : '')}>
          <h3 className="panel-title">
            <a href={'/events/' + e.id}>{e.title}</a>
          </h3>
        </div>
        <div className="panel-body">
          <dl className="dl-horizontal">
            <dt>Venue:</dt>
            <dd>{v.name}</dd>

            <dt>Artist:</dt>
            <dd>{e.artist}</dd>

            <dt>Website:</dt>
            <dd> <a href={e.website}>Link </a> </dd>

            <dt>Festival:</dt>
            <dd> {e.festival} </dd>
          </dl>
          <div dangerouslySetInnerHTML={{ __html: e.description }} />
          {this.signedIn(e, v)}
        </div>
      </div>
    );
  }

});

module.exports = EventCard;
