// https://www.npmjs.com/package/google-maps-react
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'; 
 
  const style = {
    width: '100%',
    height: '400px',
    position: 'relative'
  }
  const mapStyle = {
  height: '100%',
  width: '100%',
  margin: '0px',
  padding: '0px'
  }

  // Buggy and rubbish. Doesn't load more than one map. Replace soon.
export class MapPanel extends Component {
render() {
    return (
      <div style={style}>
          <Map
          resetBoundsOnResize
          google={window.google}
          style={mapStyle}
          initialCenter={this.props.position}
          zoom={15}
          fullscreenControl={true}
          scrollwheel={false}
          >
         <Marker
            title={'The marker`s title will appear as a tooltip.'}
            name={'SOMA'}
            position={this.props.position} />
      </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDiKvrb_NLftxFX2UHIfXlPY0vhh4baQrw")
})(MapPanel)
 