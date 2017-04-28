import React, { Component } from 'react';
import logo from './jalapeno2.png';
import './App.css';
import QrReader from 'react-qr-reader'

class App extends Component {
  constructor(props) {
    document.title = "jalapen.io"

    super(props)
    var qr = window.location.search.substring(1);
    var h =  this.hash(qr) >>> 0;
    var h_dec = "0x" + h;
    var style = "info";
    if (h === 0) {
      h_dec = "";
      style = "invisible";
    }

    var previewStyle = {
      height: 480,
      width: 640,
      position: "relative",
      margin: "auto",
      top: "20px",
    }

    this.state = {
      value: h_dec,
      styleClass: style,
      fruit_data: ["Tomato", "Cucumber", "Apple", "Orange", "Lettuce", "Corn", "Banana"],
      country_data: ["Bhaktapur, Nepal", "Mumbai, India", "Little Rock, Arkansas", "Fresno, California", "Mexico City, Mexico"],
      active: [],
      delay: 100,
      previewStyle: previewStyle,
      camVisibility: "invisible"
    };
    if (h !== 0) {
      var fruit = this.state.fruit_data[h % this.state.fruit_data.length];
      var country = this.state.country_data[h % this.state.country_data.length];
      this.state.active = [fruit, country, 0];
      var total = 0;
      for (var k = 0; k < 6; k++) {
        var val = this.determValGen(h + k, 5, 10);
        this.state.active.push(val + "/10");
        total += val;
      }
      this.state.active[2] = Math.round((total / 6) * 10) / 10;
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showCam = this.showCam.bind(this);
  }

  hash(str) {
    var hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

  determValGen(seed, low, high) {
    var gen = seed ** 1.6;
    var range = high - low;
    return Math.round((low + (gen % range)) * 10) / 10 
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.setState({camVisibility: "invisible"});
    this.setState({styleClass: "info"});
    var h =  this.state.value.substring(2);
    var h_dec = "0x" + h;
    var style = "info";
    if (h === 0 || h === "") {
      h_dec = "";
      style = "invisible";
    }
    this.setState({value: h_dec, styleClass: style});
    if (h !== 0) {
      var fruit = this.state.fruit_data[h % this.state.fruit_data.length];
      var country = this.state.country_data[h % this.state.country_data.length];
      var act = [fruit, country, 0];
      var total = 0;
      for (var k = 0; k < 6; k++) {
        var val = this.determValGen(parseInt(h) + k, 5, 10);
        act.push(val + "/10");
        total += val;
      }
      act[2] = Math.round((total / 6) * 10) / 10;
      this.setState({active: act});
    }
    event.preventDefault();
  }

  handleScan(data){
    window.location = data;
  }
  
  handleError(err){
    console.error(err)
  }

  showCam(event) {
    this.setState({camVisibility: ""});
    this.setState({styleClass: "invisible"});
  }

  render() {

    return (
      <div className="App">
        <div className="background"></div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <a href="." className="title"><h2>jalapen.io</h2></a>
        </div>
        <br></br>
        <br></br>
        <p className="App-intro">
          Enter the code for your produce below:
        </p>
        <form onSubmit={this.handleSubmit}>
          <label>
            <textarea className="codeEnter" value={this.state.value} onChange={this.handleChange}/>
          </label>
          <p></p>
          <input type="submit" value="Get Info" />
        </form>

        <a className="title takePic" onClick={this.showCam}>Or click here to scan your QR code.</a>

        <div className={this.state.camVisibility}>
        <QrReader
          delay={this.state.delay}
          style={this.state.previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}/>
        </div>

        <div className={this.state.styleClass}>
          <p className="text-style">Produce Item: <span className="emph">{this.state.active[0]}</span></p>
          <p className="text-style">From: <span className="emph">{this.state.active[1]}</span></p>
          <p className="text-style">Aggregate score of your {this.state.active[0]}: <span className="emph">{this.state.active[2]}</span></p>
          <ul className="stats">
            <li>
              <div className="row">
                <p className="label">Soil Water Retention</p>
                <p className="score">{this.state.active[3]}</p>
              </div>
            </li>
            <li>
              <div className="row">
                <p className="label">Optimal Temperature</p>
                <p className="score">{this.state.active[4]}</p>
              </div>
            </li>
            <li>
              <div className="row">
                <p className="label">Sufficient Nitrates</p>
                <p className="score">{this.state.active[5]}</p>
              </div>
            </li>
            <li>
              <div className="row">
                <p className="label">Proper Soil Absorbancy</p>
                <p className="score">{this.state.active[6]}</p>
              </div>
            </li>
            <li>
              <div className="row">
                <p className="label">Soil Purity</p>
                <p className="score">{this.state.active[7]}</p>
              </div>
            </li>
            <li>
              <div className="row">
                <p className="label">Made With Love</p>
                <p className="score">{this.state.active[8]}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
