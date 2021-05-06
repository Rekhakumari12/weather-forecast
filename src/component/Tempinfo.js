import React, { Component } from 'react';
import './css/style.css';
import Search from './search';
class Tempinfo extends Component {
  constructor() {
    super();
    this.state = {
      city: 'Mumbai',
      data: '',
      firstCall: true
    }
  }
  getInput = (event) => {
    let searchedCity = event.target.value;
    let city = searchedCity.length !== 0 ? searchedCity.charAt(0).toUpperCase() + searchedCity.slice(1) : "Mumbai";
    this.setState({ city: city });
    this.callWeatherAPI(city);
  }
  async callWeatherAPI(city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=01997a47a403873ea44d02372eae6458`;
    let resp = await fetch(url);
    let data = await resp.json();
    if (data.cod === 200) {
      this.setState({ data: data.main });
    } else {
      this.setState({ data: data });
    }
  }
  render() {
    console.log("render=", this.state.data.cod)
    if (this.state.city && this.state.firstCall===true) {
      this.setState({firstCall:false});
        this.callWeatherAPI(this.state.city);
      }

    return (
      <div className="temp_div">
        <div className="bg_image"></div>
        <div className="bg_info box">
          <h4 className="location text_shadow">{this.state.city}</h4>
          <div className="wheather_icon">
            <i className="fas fa-cloud-sun icon_shadow"></i>
          </div>
          {this.state.city?
            <div className="temp">
              <p>{this.state.data.temp?this.state.data.temp+"°C":""}</p><br />
              <p>{this.state.data.temp_min?"Min : "+this.state.data.temp_min+"°C":""}{this.state.data.temp_max?" | Max : "+this.state.data.temp_max+"°C":<p>No City Found</p>}</p>
            </div> :""
          }
          <Search getInput={this.getInput} />
          <h3 className=""></h3>
        </div>
      </div>
    )
  }
}
export default Tempinfo;