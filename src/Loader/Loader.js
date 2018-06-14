import React, { Component } from 'react';

import './Loader.css';

class Loader extends Component {
  render() {
    return (
      <div className='Loader'>
        <div className='Loader_Spinner'>
          <div className='Loader_Spinner_Double-bounce1' />
          <div className='Loader_Spinner_Double-bounce2' />
        </div>
      </div>
    );
  }
}

export default Loader;