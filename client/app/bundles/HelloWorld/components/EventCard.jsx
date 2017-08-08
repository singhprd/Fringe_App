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
    event: PropTypes.string,
    userSignedIn: PropTypes.bool,
    isFavourited: PropTypes.bool,
    imageUrls: PropTypes.array,
    voteToBeat: PropTypes.number,
    voteToStayAbove: PropTypes.number,
    short: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      venue: {},
      imageUrls: [],
      isFavourited: false,
      wellContent: [],
      wellIsOpen: false,
    };
  }
  componentDidMount() {
    this.fetchEvent();
    this.isFavourited();
  }
  fetchEvent(){
    this.setState({
        event: this.props.eventJson,
        venue: this.props.eventJson.venue,
        imageUrls: this.props.eventJson.image_urls,
        isFavourited: this.props.eventJson.favourited
      });

    // console.log(this.props.eventJson);
    // fetch('/events/' + this.props.eventId + '.json', {
    //   method: 'get'
    // }).then(function(response) {
    //   // Convert to JSON
    //   return response.json();
    // }).then(function(data) {
    //   this.setState({
    //     event: data,
    //     venue: data.venue,
    //     imageUrls: data.image_urls,
    //     isFavourited: data.favourited
    //   });
    // }.bind(this))
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
      <div className='collapse' id={'performances_for_event' + this.state.event.id}>
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
    this.setState({wellContent: content, wellIsOpen: true});
  }
  ListPanel(){
    if (!(this.props.short === true)) {
      return(
        [<ButtonGroup key="btn-group-short"> <ListPanel key={this.state.event.id} eventId={this.state.event.id}/> </ButtonGroup>]);
    }
    // else {
    //   return <button type="button" className="btn btn-default">Remove from List</button>
    // }
  }
  closeWell = () => {
    this.setState({wellIsOpen: false});
  }
  signedIn(e, v) {
    if (this.props.userSignedIn) {
      return (
        <div>
          <ButtonToolbar>
            <ButtonGroup>
              <EventVoteButtons
                score={this.state.event.score}
                voteToStayAbove={this.props.voteToStayAbove}
                voteToBeat={this.props.voteToBeat}
                eventId={this.props.eventId}
              />
              <EventFavouriteStatus
                favourite={this.favourite}
                unfavourite={this.unfavourite}
                isFavourited={this.state.isFavourited}
                eventId={this.props.eventId}
              />
              <PerformancesPanel
                wellContent={this.wellContent}
                closeWell={this.closeWell}
                eventId={this.state.event.id}
                isFringe={this.isFringe()}
              />
            </ButtonGroup>
            {this.ListPanel()}
          </ButtonToolbar>
          <Collapse in={this.state.wellIsOpen}>
            <div className='' id={'performances_for_event' + this.state.event.id}>
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
          <EventVoteButtons score={e.score} eventId={this.props.eventId} />
          <a href="/users/sign_in" type="button" className="btn btn-default">Sign In To Vote</a>
        </div>
      );
    }
  }
  favourite = (eventId) => {
    this.setState({isFavourited: true});
    $.ajax({
      url: '/favourites',
      type: 'POST',
      data: { favourite: { event_id: eventId } },
      success: function(data, status, jqXhrObj) {
        this.setState({isFavourited: true});
      }.bind(this),
      error: function() {
        // this.isFavourited();
      }
    });
  }
  unfavourite = (eventId) => {
    this.setState({isFavourited: false});
    $.ajax({
      url: '/favourites/' + eventId,
      type: 'DELETE',
      data: { favourite: { event_id: eventId } },
      success: function(data, status, jqXhrObj) {
        this.setState({isFavourited: false});
      }.bind(this),
      error: function() {
        this.isFavourited();
      }
    });
  }
  isFavourited() {
    $.ajax({
      url: '/events/' + this.state.event.id + '/is_favourited',
      type: 'GET',
      data: { event_id: this.state.event.id },
      success: function(data, status, jqXhrObj) {
        this.setState({ isFavourited: data.bool });
      }.bind(this),
      error: function() {
        this.isFavourited();
      }
    });
  }
  checkIsFavourited() {
    $('[data-toggle="tooltip"]').tooltip();
    $.ajax({
      url: '/events/' + this.state.event.id + '/is_favourited',
      type: 'GET',
      data: { event_id: this.state.event.id },
      success: function(data, status, jqXhrObj) {
        if (data.bool) {
          this.setState({ isFavourited: 'favourite' });
        }
      }.bind(this),
      error: function() {
        console.log('checkIsFavourited failed');
      }
    });
  }
  images() {
    if (typeof this.state.imageUrls === 'undefined') {
      return;
    }
    return(
      <div>
        <img src={this.state.imageUrls[0]} />
      </div>
    );
  }
  mainPanel(e,v){
    const imageUrls = this.state.imageUrls;
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
    if (this.props.short === true) {
      return;
    }
    return(
      <div className="row">
        <div id="event-card-description" dangerouslySetInnerHTML={{ __html: e.description }} />
      </div>
    );
  }
  buttonBar(e,v){
    return(
      this.signedIn(e, v)
    );
  }
  render() {
    var e = this.state.event;
    var v = this.state.venue;
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
