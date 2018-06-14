import React, { Component } from 'react';
import classNames from 'classnames';

import './ApartmentsPage.css';

function ApartmentsPageListItem({ apartment, isSelected, onClick }) {
  return (
    <div
      className={classNames('ApartmentsPage_List_Item', {
        'ApartmentsPage_List_Item__selected': isSelected
      })}
      onClick={onClick}
    >
      <div>
        <span>Address:</span>
        <span>{apartment.address}</span>
      </div>

      <div>
        <span>Area:</span>
        <span>{apartment.area} m2</span>
      </div>

      <div>
        <span>Price:</span>
        <span>${apartment.price}</span>
      </div>
    </div>
  )
}

class ApartmentsPageList extends Component {
  render() {
    return (
      <div className='ApartmentsPage_List'>
        {
          this.props.apartments.map((apartment,index) =>
            <ApartmentsPageListItem
              key={index}
              apartment={apartment}
              isSelected={this.props.selectedApartment && this.props.selectedApartment.address === apartment.address}
              onClick={() => this.props.onApartmentClick({ apartment })}
            />
          )
        }
      </div>
    );
  }s
}

export default ApartmentsPageList;