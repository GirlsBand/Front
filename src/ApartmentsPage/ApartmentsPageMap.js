import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Circle } from "react-google-maps"

import './ApartmentsPage.css';

class ApartmentsPageMap extends Component {
  render() {
    const {center_lat, center_long, radius} = this.props;
    console.log(center_lat, center_long, radius)
    
    

    if (center_lat===null || center_long==null) {
      return null;
    }
    return (
      <div className='ApartmentsPage_Map'>
        <GoogleMap
          defaultZoom={12}
          defaultCenter={{ lat: center_lat, lng: center_long }}
        >
          {
            this.props.selectedApartment && (
              [
                <Marker
                  key='marker'
                  position={{lat:this.props.selectedApartment.lat, lng:this.props.selectedApartment.long}}
                />
              ]
            )
          }
          <Circle
            key='circle'
            options={{ fillColor: '#ea4335', strokeColor: '#ea4335' }}
            center={{ lat:center_lat, lng:center_long}}
            radius={radius}
          />
        </GoogleMap>
      </div>
    );
  }
}

export default withScriptjs(withGoogleMap(ApartmentsPageMap));