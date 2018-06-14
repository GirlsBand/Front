import axios from 'axios';

export default {
  getApartments({ price,headers }) {
    return axios({
      method: 'get',
      url: `http://saloedov.ml:3001/api/apartments?highestPrice=${price}`,
      headers
    })
      .then(response => response.data)
      // TODO: remove mocking in future
      .catch(() => ({
        radius: 3000,
        center_lat: 50.4501,
        center_long: 30.5234,
        apartments: [
          {
            address: 'Atata1',
            area: 666,
            price: 123000.00,
            position: { lat: 50.4801, lng: 30.5234 }
          },
          {
            address: 'Atata2',
            area: 666,
            price: 234000.00,
            position: { lat: 50.4501, lng: 30.5234 }
          },
          {
            address: 'Atata3',
            area: 666,
            price: 345000.00,
            position: { lat: 50.4501, lng: 30.5234 }
          },
          {
            address: 'Atata4',
            area: 666,
            price: 456000.00,
            position: { lat: 50.4501, lng: 30.5234 }
          },
          {
            address: 'Atata5',
            area: 666,
            price: 456000.00,
            position: { lat: 50.4501, lng: 30.5234 }
          },
          {
            address: 'Atata6',
            area: 666,
            price: 456000.00,
            position: { lat: 50.4501, lng: 30.5234 }
          },
          {
            address: 'Atata7',
            area: 666,
            price: 456000.00,
            position: { lat: 50.4501, lng: 30.5234 }
          },
          {
            address: 'Atata8',
            area: 666,
            price: 456000.00,
            position: { lat: 50.4501, lng: 30.5234 }
          },
        ]
      }))
  }
};