import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import './ApartmentsPage.css';


class ApartmentsPageControl extends Component {
  render() {
    return (
      <div className='ApartmentsPage_Control'>
        <span>Price:</span>
        <input
          type='text'
          disabled={true}
          value={`$${this.props.minPrice}`}
        />


        <Slider
          min={this.props.minRange}
          max={this.props.maxRange}
          value={ this.props.maxPrice}
          tipFormatter={value => `$${value}`}
          onChange={range => this.props.onChange({ maxPrice: range })}
        />

        <input
          type='text'
          disabled={true}
          value={`$${this.props.maxPrice}`}
        />

        <button onClick={this.props.onSubmit}>Filter</button>
      </div>
    );
  }
}

export default ApartmentsPageControl;