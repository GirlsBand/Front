import React, { Component } from 'react';

import './ApartmentsPage.css';

class ApartmentsPageInfo extends Component {
  render() {
    return (
      <div className='ApartmentsPage_Info'>
        in this region: {this.props.region}
      </div>
    );
  }
}

export default ApartmentsPageInfo;