import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventVoteButtons from './EventVoteButtons.jsx';
import EventFavouriteStatus from './EventFavouriteStatus.jsx';
import PerformancesPanel from './PerformancesPanel.jsx';
import ImageCarousel from './ImageCarousel.jsx';
import ListPanel from './ListPanel.jsx';
import { Button, ButtonGroup, DropdownButton, MenuItem, ButtonToolbar, Collapse } from 'react-bootstrap';

export class EventCard extends Component {
  static propTypes = {
    event: PropTypes.string.isRequired,
    userSignedIn: PropTypes.bool.isRequired,
    isFavourited: PropTypes.bool,
    imageUrls: PropTypes.array,
    voteToBeat: PropTypes.number,
    voteToStayAbove: PropTypes.number,
    short: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.state = {
      event: this.getEvent(),
      isFavourited: false,
      wellContent: [],
      open: false,
    };
  }
  componentDidMount() {
    this.isFavourited();
  }
  getEvent(){
    var event = this.props.event;
    var event = $.parseJSON(event);
    return event;
  }
  isFringe(){
    var festival = this.state.event.festival_id;
    if(festival === 'demofringe' || festival === 'fringe'){
      return true;
    } else {
      return false;
    }
  }
  expandPanel(performancesTable){
    return(
      <div className='collapse' id={'performances_for_event' + this.props.eventId}>
        <div className='well well-sm'>
          <table className='table table-condensed'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              {performancesTable}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  wellContent = (content) => {
    // var cur = this.state.open;
    this.setState({wellContent: content, open: true});
  }
  ListPanel(){
    if (this.props.short !== true) {
      return(
        [<ButtonGroup > <ListPanel eventId={this.state.event.id}/> </ButtonGroup>]);
    }
  }
  signedIn(e, v) {
    if (this.props.userSignedIn) {
      return (
        <div>
          <ButtonToolbar>
            <ButtonGroup>
              <EventVoteButtons
                voteToStayAbove={this.props.voteToStayAbove}
                voteToBeat={this.props.voteToBeat}
                score={e.score}
                eventId={e.id}
              />
              <EventFavouriteStatus
                favourite={this.favourite}
                unfavourite={this.unfavourite}
                isFavourited={this.state.isFavourited}
                eventId={e.id}
              />
              <PerformancesPanel
                wellContent={this.wellContent}
                eventId={this.state.event.id}
                isFringe={this.isFringe()}
              />
            </ButtonGroup>
            {this.ListPanel()}
          </ButtonToolbar>
          <Collapse in={this.state.open}>
            <div className='' id={'performances_for_event' + this.props.eventId}>
              <div className='well well-sm' id="well-content-box">
                {this.state.wellContent}
              </div>
            </div>
          </Collapse>
        </div>
      );
    } else {
      return (
        <div className="btn-toolbar" role="toolbar">
          <EventVoteButtons score={e.score} eventId={e.id} />
          <a href="/users/sign_in" type="button" className="btn btn-default">Sign In To Vote</a>
        </div>
      );
    }
  }
  favourite = (event_id) => {
    // favourite(event_id) {
    // console.log("Faved")
    // Keen Bean Loading
    this.setState({isFavourited: true});
    $.ajax({
      url: '/favourites',
      type: 'POST',
      data: { favourite: { event_id: event_id } },
      success: function(a, b, c) {
        this.setState({isFavourited: true});
        console.log(a,b,c);
        // this.isFavourited();
      }.bind(this),
      error: function() {
        console.log('failed favourite user_event_status.jsx');
      }
    });
  }
  unfavourite = (event_id) => {
    // unfavourite(event_id) {
    // console.log("Un-Faved")
    // Keen Bean Loading
    // this.setState({isFavourited: false});
    $.ajax({
      url: '/favourites/' + event_id,
      type: 'DELETE',
      data: { favourite: { event_id: event_id } },
      success: function(a, b, c) {
        this.setState({isFavourited: false});
        // console.log(a,b,c)
        // this.isFavourited();
      }.bind(this),
      error: function() {
        console.log('failed unfavourite user_event_status.jsx');
      }
    });
  }
  isFavourited() {
    // var that = this;
    $.ajax({
      url: '/events/' + this.state.event.id + '/is_favourited',
      type: 'GET',
      data: { event_id: this.state.event.id },
      success: function(a, b, c) {
        this.setState({ isFavourited: a.bool });
        // $("#notice").html(a['notice'])
        // console.log('isFavourited' + a.bool);

      }.bind(this),
      error: function() {
        console.log('failed isFavourited user_event_status.jsx');
      }
    });
  }
  checkIsFavourited() {
    $('[data-toggle="tooltip"]').tooltip();
    // var that = this;
    $.ajax({
      url: '/events/' + this.state.event.id + '/is_favourited',
      type: 'GET',
      data: { event_id: this.state.event.id },
      success: function(a, b, c) {
        if (a.bool) {
          this.setState({ isFavourited: 'favourite' });
        }
      }.bind(this),
      error: function() {
        console.log('failed isFavourited user_event_status.jsx');
      }
    });
  }
  images() {
    if (typeof this.props.imageUrls === 'undefined') {
      return;
    }
    // var imagesTags = this.props.imageUrls.map(function(url){
    //     console.log(url);
    // });
    return(
      <div>
        <img src={this.props.imageUrls[0]} />
      </div>
    );
  }
  mainPanel(e,v){
    // if (this.props.short == true) {
    //     return;
    // }
    const imageUrls = this.props.imageUrls;
    return(
      <div className="row">

        <div className="col-xs-2 col-sm-2" id="carousel-box">
          <ImageCarousel imageUrls={imageUrls} eventId={e.id} />
        </div>

        <div className="col-xs-6 col-sm-6">
          <div className="row">
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
          </div>
        </div>
      </div>
    );
  }
  description(e,v){
    if (this.props.short == true) {
      return;
    }
    return(
      <div className="row">
        <div id="event-card-description" dangerouslySetInnerHTML={{ __html: e.description }} />
      </div>
    );
  }
  buttonBar(e,v){
    // if (this.props.short == true) {
    //     return;
    // }
    return(
      this.signedIn(e, v)
    );
  }
  render() {
    const e = this.state.event;
    var v = '';
    if (this.props.venue === false) {
      v = {name: 'NoName'};
    } else {
      v = JSON.parse(this.props.venue);
    }
    return (
      <div className="panel panel-primary home_card text-info" id={this.state.id}>
        <div className={'panel-heading ' + (this.state.isFavourited ? 'favourite' : '')}>
          <h3 className="panel-title">
            <a href={'/events/' + e.id}>{e.title}</a>
          </h3>
        </div>

        <div className="container-fluid" id="home-card">

          {this.mainPanel(e,v)}
          {this.description(e,v)}
          {this.buttonBar(e,v)}
        </div>
      </div>
    );
  }
}

module.exports = EventCard;
