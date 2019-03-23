// https://www.npmjs.com/package/google-maps-react
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
  
const params = {v: '3.exp', key: 'AIzaSyDiKvrb_NLftxFX2UHIfXlPY0vhh4baQrw'};
 
export class MapPanel extends Component { 
  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: false,
      fullScreenControl: true,
      panControl: true,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: true,
      overviewMapControl: true,
      rotateControl: true
    });
  }
 
  onDragEnd(e) {
    console.log('onDragEnd', e);
  }
 
  onCloseClick() {
    console.log('onCloseClick');
  }
 
  onClick(e) {
    console.log('onClick', e);
  }
 
  render() {
    return (
      <Gmaps
        width={'100%'}
        height={'300px'}
        lat={this.props.coords.lat}
        lng={this.props.coords.lng}
        zoom={15}
        loadingMessage={'Loading...'}
        params={params}
        onMapCreated={this.onMapCreated}>
        <Marker
          lat={this.props.coords.lat}
          lng={this.props.coords.lng}
          draggable={true}
          onDragEnd={this.onDragEnd} />
      </Gmaps>
    );
  }
 
};
 
module.exports = MapPanel;

// <InfoWindow
//      lat={this.props.coords.lat}
//      lng={this.props.coords.lng}
//      content={'Hello, React :)'}
//      onCloseClick={this.onCloseClick} />
//    <Circle
//      lat={this.props.coords.lat}
//      lng={this.props.coords.lng}
//      radius={500}
//      onClick={this.onClick} />
