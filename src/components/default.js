import React, { Component } from 'react';

import Home from '../components/home';
import Explorer from '../components/explorer';

class Defaults extends Component {

  constructor(props) {
    super(props);
    this.showDetail = this.showDetail.bind(this);
    this.handleHome = this.handleHome.bind(this);
    this.state = {
      showDetail: false,
      address: false,
    };
  }
  showDetail() {
    this.setState({ showDetail: true });
  }
  handleHome(address) {
    this.setState({ address });
  }
  render() {
    if (!this.state.showDetail) {
      return <Home onShow={this.showDetail} onHandleHome={this.handleHome} />;
    }
    return <Explorer onShow={this.showDetail} AddressShow={this.state.address} />;
  }

}

export default Defaults;
