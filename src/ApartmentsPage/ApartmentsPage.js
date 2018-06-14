import React, { Component } from 'react';

import { apartmentsService } from '../libs';

import Loader from '../Loader';
import axios from 'axios';
import ApartmentsPageHeader from './ApartmentsPageHeader';
import ApartmentsPageInfo from './ApartmentsPageInfo';
import ApartmentsPageControl from './ApartmentsPageControl';
import ApartmentsPageMap from './ApartmentsPageMap';
import ApartmentsPageList from './ApartmentsPageList';

import './ApartmentsPage.css';

class ApartmentsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken:'' ,
      minRange: null,
      maxRange: null,
      minPrice: null,
      maxPrice: null,
      radius: undefined,
      center_lat:null,
      center_long:null,
      apartments: [],
      selectedApartment: undefined,
      isLoading: true
    };

    this.onControlChange = this.onControlChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onApartmentClick = this.onApartmentClick.bind(this);
  }

  componentDidMount() {
    const {history} = this.props;
    if (this.props.location.state===undefined){
      history.push('/')
      return
    }
    
    this.setState({accessToken:this.props.location.state.token})
    const headers = {
      'ClientAccessToken': this.props.location.state.token
    };
    axios({
      method:'get',
      url:'http://saloedov.ml:3001/api/prices',
      headers
    })
    .then(response =>{
      console.log(this.props.location.state.center_lat)
      this.setState ({
        radius:  this.props.location.state.radius,
        center_lat: this.props.location.state.center_lat,
        center_long: this.props.location.state.center_long,
        apartments : this.props.location.state.apartments,
        minRange: response.data.lowestPrice,
        maxRange: response.data.highestPrice,
        minPrice: response.data.lowestPrice,
        maxPrice: response.data.highestPrice,    
        isLoading: false
      })
    })
    window.scrollTo(0, 0)
  }

  getApartments() {
    const {price} = this.state;
    const headers = {
      'ClientAccessToken': this.state.accessToken ,
    };

    this.setState({ isLoading: true });
    apartmentsService
      .getApartments({
        price: this.state.maxPrice,
        headers
      })
      .then(({ radius,center_lat,center_lot, apartments }) => {
        console.log(radius,center_lat,center_lot, apartments)
        this.setState({
          radius,
          apartments,
          center_lat,
          center_long:center_lot,
          selectedApartment: undefined,
          isLoading: true
        });
      })  
      // .finally(() => {
      //   this.setState({ isLoading: false });
      // });
  }

  onControlChange({  maxPrice }) {
    this.setState({  maxPrice });
  }

  onSubmit() {
    this.getApartments();
  }

  onApartmentClick({ apartment }) {
    if (this.state.selectedApartment && this.state.selectedApartment.address === apartment.address) {
      this.setState({ selectedApartment: {}})
    } else {
      this.setState({ selectedApartment: apartment })
    }
  }

  renderFooter = () => {
    return(
        <div className="ApartmentsPage_Footer">
            <div className='ApartmentsPage_Footer_Nav'>
                Best recommendations for apartments issue <br/>
                | IASA |
            </div>
            <a className='ApartmentsPage_Feedback' href="mailto:iasaka73m@gmail.com">Leave feedback</a>
        </div>
    )
};

  render() {
    const {price} = this.state;
    const key = 'AIzaSyAm7SwD1A1MoZJhanT1HD2R4zBesZ1UWKE';
    return (
      <div className='ApartmentsPage'>
        <ApartmentsPageHeader />

        <div className='ApartmentsPage_Content'>
          <ApartmentsPageInfo region={this.state.region} />
          <ApartmentsPageControl
            minRange={this.state.minRange}
            maxRange={this.state.maxRange}
            minPrice={this.state.minPrice}
            maxPrice={this.state.maxPrice}
            onChange={this.onControlChange}
            onSubmit={this.onSubmit}
          />

          <div className='ApartmentsPage_Content_Row'>
            <div className='ApartmentsPage_Content_Column'>
              <ApartmentsPageMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `600px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                selectedApartment={this.state.selectedApartment}
                radius={this.state.radius}
                center_lat={this.state.center_lat}
                center_long={this.state.center_long}
              />
            </div>

            <div className='ApartmentsPage_Content_Column'>
              <ApartmentsPageList
                apartments={this.state.apartments}
                selectedApartment={this.state.selectedApartment}
                onApartmentClick={this.onApartmentClick}
              />
            </div>
          </div>
        </div>

        {
          this.state.isLoading && <Loader />
        }
       { this.renderFooter()}
      </div>
    );
  }
}

export default ApartmentsPage;